import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reparacion } from 'src/models/Reparacion';
import { ReparacionDTO } from 'src/models/DTO/ReparacionDTO';
import { Car } from '../../models/Car';
import { CarDTO } from '../../models/DTO/CarDTO';
import { EventoService } from '../evento/evento.service';
import { Evento } from 'src/models/Evento';

@Injectable()
export class ReparacionService {
    constructor(
        @InjectRepository(Reparacion)
        private reparacionRepository: Repository<Reparacion>,
        
        private readonly eventoService: EventoService,
    ) {}

    async crearReparacion(reparacionDTO: ReparacionDTO): Promise<Reparacion> {
        console.log("Creando reparación", reparacionDTO)
        
        const reparacion = Reparacion.toEntity(reparacionDTO);
        console.log("ReparaciónEntity", reparacion)

        const reparacionConID: Reparacion = this.reparacionRepository.create(reparacion);
        console.log("Reparación con ID", reparacionConID)

        const eventos: Evento[] = await this.eventoService.createEventosFromReparacion(reparacionConID);
        console.log("Eventos creados", eventos)

        reparacionConID.eventos = eventos
        console.log("Reparación con eventos", reparacionConID)

        const alquilerPersistido = await this.reparacionRepository.save(reparacionConID);
        console.log("Reparación persistida", alquilerPersistido)

        return alquilerPersistido;
    }

    // async postAlquiler(alquilerDTO: AlquilerDTO): Promise<AlquilerDTO> {

    //     const alquilerCreado: Alquiler = this.alquilerRepository.create(alquilerDTO);
    //     const eventos: Evento[] = await this.eventoService.createEventosFromAlquiler(alquilerCreado);
    
    //     console.log("Eventos creados", eventos)
    
    //     alquilerCreado.eventos = eventos
    
    //     const alquilerEntidad = await this.alquilerRepository.save(alquilerCreado);
    //     const alquilerResponseDTO: AlquilerDTO = AlquilerDTO.toDTO(alquilerEntidad);
    
    //     console.log("--------------------[Alquiler guardado]----------------------")
    //     console.log(alquilerResponseDTO)
    
    //     return alquilerResponseDTO;
    //   }

    async finalizarReparacion(id: string, fechaFin: Date): Promise<Reparacion> {
        const reparacion = await this.reparacionRepository.findOne({ where: { id } });
        if (!reparacion) {
            throw new Error('Reparación no encontrada');
        }
        reparacion.fechaFin = fechaFin;
        return await this.reparacionRepository.save(reparacion);
    }

    async obtenerReparacionesPorAuto(carId: number): Promise<Reparacion[]> {
        return await this.reparacionRepository.find({ where: { car: { id: carId } } });
    }

    async obtenerTodasLasReparaciones(): Promise<Reparacion[]> {
        return await this.reparacionRepository.find();
    }
}


