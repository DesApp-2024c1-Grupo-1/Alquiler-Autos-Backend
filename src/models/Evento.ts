import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EventoType } from "./enums/EventoType";

@Entity()
export class Evento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @Column()
    text: string;

    @Column()
    color: string;

    @Column()
    type: EventoType;

    @Column({type: 'json', nullable: true})
    data?: Object;

    constructor(start: Date, end: Date, text: string, color: string, type: EventoType, data?: Object) {
        this.start = start;
        this.end = end;
        this.text = text;
        this.color = color;
        this.type = type;
        this.data = data;
    }
}