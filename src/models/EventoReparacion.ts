import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, ChildEntity, OneToOne } from "typeorm";
import { EventoTypeEnum } from "./enums/EventoTypeEnum";
import { Alquiler } from "./Alquiler";
import { EventoDTO } from "./DTO/EventoDTO";
import { Reparacion } from "./Reparacion";
import { Evento } from "./Evento";

@ChildEntity()
export class EventoReparacion extends Evento {
    
    @ManyToOne(() => Reparacion)
    @JoinColumn()
    reparacion: Reparacion;
    

    @Column()
    type: EventoTypeEnum;


    static toEntity(evento:EventoDTO): Evento{
        const eventoEntity = new EventoReparacion();
        eventoEntity.id = evento.id;
        eventoEntity.fecha = evento.start || evento.end;
        eventoEntity.text = evento.text;
        eventoEntity.color = evento.color;
        eventoEntity.type = evento.type;
        // eventoEntity.entidadId = evento.entidadId;
        eventoEntity.reparacion = Reparacion.toEntity(evento.reparacion);
        return eventoEntity;
    }

}