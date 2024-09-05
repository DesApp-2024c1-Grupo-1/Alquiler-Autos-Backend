import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../../models/Car';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FiltrosDTO } from 'src/models/DTO/FiltrosDTO';
import { AlquilerService } from '../alquiler/alquiler.service';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { CarDTO } from 'src/models/DTO/CarDTO';

@Injectable()
export class CarService {
 
    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        private readonly alquilerService: AlquilerService
    ) { }

    async getAllCarAvailable(filtros:FiltrosDTO): Promise<Car[]> {

        if(!filtros.fechaRetiro || !filtros.fechaDevolucion) {
            return this.getAllCar(filtros);
        }

        //Busca los alquileres que cuyo rango de fechas se solapan con el rango de fechas de los filtros
        const alquileresSolapados: AlquilerDTO[] = await this.alquilerService.getAllAlquileresBetween(filtros.fechaRetiro, filtros.fechaDevolucion);
        console.log("Alquileres solapados", alquileresSolapados)
        //Se obtienen los ids de autos que estan en los alquileres solapados
        const idsAutosNoDisponibles = new Set(alquileresSolapados.map(alquiler => alquiler.car.id));

        console.log("Autos no disponibles", idsAutosNoDisponibles)

        //Se obtienen los autos segun los filtros
        let autosFiltrados = await this.carRepository.findBy({ ac: filtros.ac, combustible: filtros.combustible, transmision: filtros.transmision, capacidad: MoreThanOrEqual(filtros.capacidad)})

        //Se quitan los autos no disponibles de la lista de autos filtrados
        autosFiltrados = autosFiltrados.filter(auto => !idsAutosNoDisponibles.has(auto.id));
 
        return autosFiltrados;
    }

    async getAllCar(filtros:FiltrosDTO): Promise<Car[]> {

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

}

