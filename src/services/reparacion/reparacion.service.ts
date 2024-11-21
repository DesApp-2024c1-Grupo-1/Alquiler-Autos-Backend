import { Injectable } from '@nestjs/common';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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

    async crearReparacion(reparacionDTO: ReparacionDTO): Promise<ReparacionDTO> {
        console.log("Creando reparación", reparacionDTO)
        
        const reparacion = Reparacion.toEntity(reparacionDTO);
        console.log("ReparaciónEntity", reparacion)

        const reparacionConID: Reparacion = this.reparacionRepository.create(reparacion);
        console.log("Reparación con ID", reparacionConID)

        const eventos: Evento[] = await this.eventoService.createEventosFromReparacion(reparacionConID);
        console.log("Eventos creados", eventos)

        reparacionConID.eventos = eventos
        console.log("Reparación con eventos", reparacionConID)

        const reparacionPersistida = await this.reparacionRepository.save(reparacionConID);
        console.log("Reparación persistida", reparacionPersistida)

        const reparacionResponseDTO: ReparacionDTO = ReparacionDTO.toDTO(reparacionPersistida);

        return reparacionResponseDTO;
    }

    async getAllReparacionesBetween(fechaInicio, fechaFin): Promise<Reparacion[]> {
        console.log("Buscando reparacion del ", fechaInicio, " al ", fechaFin)
    
        return this.reparacionRepository.find({
        where: [
                {
                    fechaInicio: Between(fechaInicio, fechaFin),
                },
                {
                    fechaFin: Between(fechaInicio, fechaFin),
                },
                {
                    fechaInicio: LessThanOrEqual(fechaInicio),
                    fechaFin: MoreThanOrEqual(fechaInicio),
                },
                {
                    fechaInicio: LessThanOrEqual(fechaFin),
                    fechaFin: MoreThanOrEqual(fechaFin),
                },
            ],
        relations: ['car']
        }
        );
      }

    async finalizarReparacion(id: number, fechaFin: Date): Promise<Reparacion> {
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


