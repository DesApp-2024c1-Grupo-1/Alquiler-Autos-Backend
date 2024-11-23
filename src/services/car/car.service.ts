import {Injectable, NotFoundException} from '@nestjs/common';
import {Car} from '../../models/Car';
import {InjectRepository} from '@nestjs/typeorm';
import {MoreThanOrEqual} from 'typeorm';
import {Repository} from 'typeorm/repository/Repository';
import {FiltrosDTO} from 'src/models/DTO/FiltrosDTO';
import {AlquilerService} from '../alquiler/alquiler.service';
import {ReparacionService} from '../reparacion/reparacion.service';
import {AlquilerDTO} from 'src/models/DTO/AlquilerDTO';
import {CarDTO} from 'src/models/DTO/CarDTO';
import {AvailabilityDTO} from "../../models/DTO/AvailabilityDTO";
import {EventoService} from "../evento/evento.service";
import {EventoDTO} from "../../models/DTO/EventoDTO";
import {Evento} from "../../models/Evento";

@Injectable()
export class CarService {
 
    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        private readonly alquilerService: AlquilerService,
        private readonly reparacionService: ReparacionService,
        private readonly eventoService: EventoService,
    ) { }

    async getAllCarAvailable(filtros:FiltrosDTO): Promise<CarDTO[]> {
        console.log("----------------[Get All Cars Available]-----------------")

        if(!filtros.fechaRetiro || !filtros.fechaDevolucion) {
            return this.getAllCar(filtros);
        }

        //Busca los alquileres que cuyo rango de fechas se solapan con el rango de fechas de los filtros
        const alquileresSolapados: AlquilerDTO[] = await this.alquilerService.getAllAlquileresBetween(filtros.fechaRetiro, filtros.fechaDevolucion);
        console.log("Alquileres solapados", alquileresSolapados)
        //Se obtienen los ids de autos que estan en los alquileres solapados
        const idsAutosEnAlquiler = new Set(alquileresSolapados.map(alquiler => alquiler.car.id));

        console.log("Autos no disponibles", idsAutosEnAlquiler)

        //Se obtienen los autos segun los filtros
        let autosFiltrados: CarDTO[] = await this.carRepository.findBy({ ac: filtros.ac, combustible: filtros.combustible, transmision: filtros.transmision, capacidad: MoreThanOrEqual(filtros.capacidad)})


        //Busca las reparaciones asignadas a autos que cuyo rango de fechas se solapan con el rango de fechas de los filtros
        const reparacionesSolapadas: AlquilerDTO[] = await this.reparacionService.getAllReparacionesBetween(filtros.fechaRetiro, filtros.fechaDevolucion);
        console.log("reparaciones solapados", reparacionesSolapadas)
        //Se obtienen los ids de autos que estan en las reparaciones solapados
        const idsAutosEnReparacion = new Set(reparacionesSolapadas.map(reparacion => reparacion.car.id));

        console.log("Autos no disponibles", idsAutosEnReparacion)


        //Se marcan los autos no disponibles como reservados por alquiler
        autosFiltrados.forEach(auto => idsAutosEnAlquiler.has(auto.id) ? auto.reservado = true : auto.reservado = false);


        //Se marcan los autos no disponibles como en reparacion
        autosFiltrados.forEach(auto => idsAutosEnReparacion.has(auto.id) ? auto.enReparacion = true : auto.enReparacion = false);




        return autosFiltrados;
    }

    async getAllCar(filtros:FiltrosDTO): Promise<Car[]> {

        console.log("---------------[Get All Cars Sin fechas]-----------------")

        filtros.capacidad = filtros.capacidad ? filtros.capacidad : 0;
 
        return await this.carRepository.findBy({ ac: filtros.ac, combustible: filtros.combustible, transmision: filtros.transmision, capacidad: MoreThanOrEqual(filtros.capacidad)
        });

    }

    async getCarById(id: number): Promise<Car> {
        console.log("getCarById, id: ", id)

        const car: Car = await this.carRepository.findOneBy({id});
        
        if(!car) {
            throw new NotFoundException("Car not found");
        }

        return car;
    }

    async getCarByIdWithDeleted(id: number): Promise<Car> {
        console.log("getCarById, id: ", id);
    
        const car: Car = await this.carRepository
            .createQueryBuilder('car')
            .where('car.id = :id', { id })
            .withDeleted()
            .getOne();
    
        if (!car) {
            throw new NotFoundException("Car not found");
        }
    
        return car;
    }

    // async getPatente(patente: string): Promise<Car>{
    //     console.log("getPatente, patente: ", patente)

    //     const patente = await this.carRepository.findOneBy({patente})
    // }

    async postCar(carDTO: CarDTO): Promise<Car> {
        // ver si hay que poner validaciones
        console.log("Service postCar")
        carDTO.fechaLanzamiento = new Date();
        const carPersistido = await this.carRepository.save(carDTO);
        console.log("Car persistido", carPersistido)

        return carPersistido;
    }

    async putCar(id: number, carDTO: CarDTO): Promise<CarDTO> {
        console.log("Service putCar", id)
        const car: Car = await this.getCarById(id);
        const carActualizado: CarDTO = await this.carRepository.save({...car, ...carDTO});
        return carActualizado;
    }

    async deleteCar(id: number): Promise<CarDTO> {
        console.log("Service deleteCar", id)
        let car: Car = await this.getCarById(id);
        console.log("Car", car)
        const response = await this.carRepository.softRemove(car);
        console.log("Response", response)
        return car;
    }

    async getCarAvailabilityById(id: number, filtros: FiltrosDTO): Promise<AvailabilityDTO> {
        const eventosSuperpuestos : Evento[] = await this.eventoService.getAllEventosFromCarBetween(id, filtros.fechaRetiro, filtros.fechaDevolucion);
        const eventosSuperpuestosDTO = eventosSuperpuestos.map(evento => EventoDTO.toDTO(evento));

        const availability = eventosSuperpuestos.length == 0

        return new AvailabilityDTO(availability, eventosSuperpuestosDTO)

    }
}

