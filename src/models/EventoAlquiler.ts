import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, ChildEntity, OneToOne } from "typeorm";
import { EventoTypeEnum } from "./enums/EventoTypeEnum";
import { Alquiler } from "./Alquiler";
import { EventoDTO } from "./DTO/EventoDTO";
import { Evento } from "./Evento";

@ChildEntity()
export class EventoAlquiler extends Evento {
   
    @ManyToOne(() => Alquiler)
    @JoinColumn()
    alquiler: Alquiler;
    

    @Column()
    type: EventoTypeEnum;


    static toEntity(evento:EventoDTO): Evento{
        const eventoEntity = new EventoAlquiler();
        eventoEntity.id = evento.id;
        eventoEntity.fecha = evento.start || evento.end;
        eventoEntity.text = evento.text;
        eventoEntity.color = evento.color;
        eventoEntity.type = evento.type;
        // eventoEntity.entidadId = evento.entidadId;
        eventoEntity.alquiler = Alquiler.toEntity(evento.alquiler);
        return eventoEntity;
    }

}