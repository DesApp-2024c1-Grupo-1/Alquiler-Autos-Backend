import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EventoTypeEnum } from "./enums/EventoTypeEnum";

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
    type: EventoTypeEnum;

    @Column({type: 'json', nullable: true})
    data?: Object;

    constructor(start: Date, end: Date, text: string, color: string, type: EventoTypeEnum, data?: Object) {
        this.start = start;
        this.end = end;
        this.text = text;
        this.color = color;
        this.type = type;
        this.data = data;
    }
}