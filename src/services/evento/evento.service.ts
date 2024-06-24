import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { Evento } from 'src/models/Evento';
import { EventoType } from 'src/models/enums/EventoType';
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
        const eventoRetiro = new Evento(alquiler.fechaRetiro, alquiler.fechaRetiro, alquiler.car.patente, "#00ff00", EventoType.Retiro,alquiler)
        const eventoDevolucion = new Evento(alquiler.fechaDevolucion, alquiler.fechaDevolucion, alquiler.car.patente, "#ff0000", EventoType.Devolucion, alquiler);
        
        return [this.eventoRepository.save(eventoRetiro),this.eventoRepository.save(eventoDevolucion)]
    }
}
