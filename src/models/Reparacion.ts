import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Car } from "./Car";
import { ReparacionDTO } from "./DTO/ReparacionDTO";
import { Evento } from "./Evento";
import { EventoReparacion } from "./EventoReparacion";

@Entity()
export class Reparacion {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'timestamp', nullable: true})
    fechaInicio: Date;

    @Column({type: 'timestamp', nullable: true})
    fechaFin: Date;

    @Column()
    cantidadDias: number;

    @Column()
    razon: string;

    @ManyToOne(() => Car, car => car.alquiler)
    car: Car;

    @OneToMany(() => EventoReparacion, (evento) => evento.reparacion,{cascade: true})
    eventos: Evento[];

    static toEntity(ReparacionDTO: ReparacionDTO): Reparacion {
        const entity = new Reparacion();
        entity.id = ReparacionDTO.id;
        entity.fechaInicio = ReparacionDTO.fechaInicio;
        entity.fechaFin = ReparacionDTO.fechaFin;
        entity.cantidadDias = ReparacionDTO.cantidadDias;
        entity.razon = ReparacionDTO.razon;
        entity.car = ReparacionDTO.car;

        return entity;
    }

}