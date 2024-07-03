import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { Evento } from 'src/models/Evento';
import { EventoTypeEnum } from 'src/models/enums/EventoTypeEnum';
import { Repository } from 'typeorm';

@Injectable()
export class EventoService {

    constructor(
        @InjectRepository(Evento) private readonly eventoRepository: Repository<Evento>
    ){}

    getAllEventos(): Promise<Evento[]> {
        return this.eventoRepository.find();
    }

    createEventosFromAlquiler(alquiler : Alquiler): Promise<Evento>[] {
        const eventoRetiro = new Evento(
            alquiler.fechaRetiro, 
            alquiler.fechaRetiro, 
            EventoTypeEnum.Retiro + " " + alquiler.car.brand + " " + alquiler.car.name + " - " + alquiler.car.patente, 
            "#00ff00", 
            EventoTypeEnum.Retiro,
            alquiler)

        const eventoDevolucion = new Evento(
            alquiler.fechaDevolucion, 
            alquiler.fechaDevolucion, 
            EventoTypeEnum.Devolucion + " " + alquiler.car.brand + " " + alquiler.car.name + " - " + alquiler.car.patente, 
            "#ff0000", 
            EventoTypeEnum.Devolucion,
            alquiler)
        
        return [this.eventoRepository.save(eventoRetiro),this.eventoRepository.save(eventoDevolucion)]
    }
}
