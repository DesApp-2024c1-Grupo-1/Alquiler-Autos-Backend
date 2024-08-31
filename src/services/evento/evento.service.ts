import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { EventoDTO } from 'src/models/DTO/EventoDTO';
import { Evento } from 'src/models/Evento';
import { EventoTypeEnum } from 'src/models/enums/EventoTypeEnum';
import { Repository } from 'typeorm';

@Injectable()
export class EventoService {

    constructor(
        @InjectRepository(Evento) private readonly eventoRepository: Repository<Evento>
    ){}

    async getAllEventos(): Promise<EventoDTO[]> {
        console.log("----------------[getAllEventos]----------------")
        const listaEventos: any[] = await this.eventoRepository.find({ relations: ["alquiler", "alquiler.cliente","alquiler.car"] });
        const listaEventosDTO = listaEventos.map(evento => EventoDTO.toDTO(evento));
        console.log("Lista EventosDTO: ", listaEventosDTO)
        
        return listaEventosDTO;
    }

    async createEventosFromAlquiler(alquiler : Alquiler): Promise<Evento[]> {
        const eventoRetiro = new Evento()
            eventoRetiro.fecha = alquiler.fechaRetiro,
            eventoRetiro.text = EventoTypeEnum.Retiro_Alquiler + " " + alquiler.car.brand + " " + alquiler.car.name + " - " + alquiler.car.patente, 
            eventoRetiro.color = "#00ff00", 
            eventoRetiro.type = EventoTypeEnum.Retiro_Alquiler,
            eventoRetiro.entidadId = alquiler.id,
            eventoRetiro.alquiler = alquiler;
        
        const eventoDevolucion = new Evento()
            eventoDevolucion.fecha = alquiler.fechaDevolucion,
            eventoDevolucion.text = EventoTypeEnum.Devolucion_Alquiler + " " + alquiler.car.brand + " " + alquiler.car.name + " - " + alquiler.car.patente, 
            eventoDevolucion.color = "#ff0000", 
            eventoDevolucion.type = EventoTypeEnum.Devolucion_Alquiler,
            eventoDevolucion.entidadId = alquiler.id;
        
        const eventos: Evento[] = [eventoRetiro, eventoDevolucion];

        return eventos
    }
    //Deberia crear EventosDTO? Son para persistir
    // async createEventosFromAlquiler(alquiler : Alquiler): Promise<EventoDTO[]> {
    //     const eventoRetiro = new EventoDTO()
    //         eventoRetiro.start = alquiler.fechaRetiro
    //         eventoRetiro.end = alquiler.fechaRetiro
    //         eventoRetiro.text = EventoTypeEnum.Retiro_Alquiler + " " + alquiler.car.brand + " " + alquiler.car.name + " - " + alquiler.car.patente, 
    //         eventoRetiro.color = "#00ff00", 
    //         eventoRetiro.type = EventoTypeEnum.Retiro_Alquiler,
    //         eventoRetiro.entidadId = alquiler.id;
        
    //     const eventoDevolucion = new EventoDTO()
    //         eventoDevolucion.start = alquiler.fechaDevolucion,
    //         eventoDevolucion.end = alquiler.fechaDevolucion,
    //         eventoDevolucion.text = EventoTypeEnum.Devolucion_Alquiler + " " + alquiler.car.brand + " " + alquiler.car.name + " - " + alquiler.car.patente, 
    //         eventoDevolucion.color = "#ff0000", 
    //         eventoDevolucion.type = EventoTypeEnum.Devolucion_Alquiler,
    //         eventoDevolucion.entidadId = alquiler.id;
        
    //     const eventos: EventoDTO[] = [eventoRetiro, eventoDevolucion];

    //     return eventos
    // }

    async getEventobyId(id: number): Promise<EventoDTO> {
        const evento:Evento = await this.eventoRepository.findOne({ where: { id } , relations: ["alquiler"]});
        if(!evento)
            throw new BadRequestException(`Evento ${id} inexistente`);

        const eventoDTO = EventoDTO.toDTO(evento);
        return eventoDTO;
    }

    // async findEventosbyAlquiler(alquiler: AlquilerDTO): Promise<Evento[]> {
    //     const data = alquiler
    //     return this.eventoRepository.find({where:{ data: {alquiler} }});
    // }

    async saveEventos(eventos: Evento[]): Promise<Evento[]> {
        return this.eventoRepository.save(eventos);
    }

    // async putEventoById(id: number, evento: Evento): Promise<Evento> {

    //     if (!this.eventoRepository.findOne({ where: { id } }))
    //         throw new BadRequestException("Evento inexistente");

    //     //Lista de todos los eventos asociados a la entidad relacionada
    //     const eventosAsociados: Evento[] = await this.eventoRepository.find({ where: { entidadId: evento.entidadId } });

        

    //     return null;

    // }


}
