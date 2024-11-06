import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reparacion } from 'src/models/Reparacion';
import { ReparacionDTO } from 'src/models/DTO/ReparacionDTO';
import { Car } from '../../models/Car';
import { CarDTO } from '../../models/DTO/CarDTO';

@Injectable()
export class ReparacionService {
    constructor(
        @InjectRepository(Reparacion)
        private reparacionRepository: Repository<Reparacion>,
        
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
    ) {}

    async crearReparacion(reparacionDTO: ReparacionDTO): Promise<Reparacion> {
        const reparacion = Reparacion.toEntity(reparacionDTO);
        return await this.reparacionRepository.save(reparacion);
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


