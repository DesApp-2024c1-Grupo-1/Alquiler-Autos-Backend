import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn, TableInheritance } from "typeorm";
import { EventoTypeEnum } from "./enums/EventoTypeEnum";
import { Alquiler } from "./Alquiler";
import { EventoDTO } from "./DTO/EventoDTO";
import { Reparacion } from "./Reparacion";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "tipo_evento" } })
export class Evento {
    [x: string]: any;
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'timestamp', nullable: true})
    fecha: Date;

    @Column()
    text: string;

    @Column()
    color: string;

    @Column()
    momento: EventoTypeEnum;

    @DeleteDateColumn()
    deletedAt: Date; 

    constructor() {}

    static toEntity(evento:EventoDTO): Evento{
        const eventoEntity = new Evento();
        eventoEntity.id = evento.id;
        eventoEntity.fecha = evento.start || evento.end;
        eventoEntity.text = evento.text;
        eventoEntity.color = evento.color;
        eventoEntity.momento = evento.momento;
        // eventoEntity.entidadId = evento.entidadId;
        // eventoEntity.alquiler = Alquiler.toEntity(evento.alquiler);
        return eventoEntity;
    }

}