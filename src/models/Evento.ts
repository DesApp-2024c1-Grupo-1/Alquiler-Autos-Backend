import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventoTypeEnum } from "./enums/EventoTypeEnum";
import { Alquiler } from "./Alquiler";
import { EventoDTO } from "./DTO/EventoDTO";

@Entity()
export class Evento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'timestamp', nullable: true})
    fecha: Date;

    @Column()
    text: string;

    @Column()
    color: string;

    @Column()
    type: EventoTypeEnum;

    @Column()
    entidadId: number;

    @ManyToOne(() => Alquiler, (alquiler) => alquiler.eventos)
    @JoinColumn({ name: "entidadId" })
    alquiler: Alquiler;

    constructor() {}

    static toEntity(evento:EventoDTO): Evento{
        const eventoEntity = new Evento();
        eventoEntity.id = evento.id;
        eventoEntity.fecha = evento.start || evento.end;
        eventoEntity.text = evento.text;
        eventoEntity.color = evento.color;
        eventoEntity.type = evento.type;
        eventoEntity.entidadId = evento.entidadId;
        eventoEntity.alquiler = Alquiler.toEntity(evento.alquiler);
        return eventoEntity;
    }

}