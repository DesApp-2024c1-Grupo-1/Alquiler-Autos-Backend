import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Car } from "./Car";
import { Cliente } from "./Cliente";

@Entity()
export class Alquiler {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fechaRetiro: Date;

    @Column()
    lugarRetiro: string;

    @Column()
    fechaDevolucion: Date;

    @Column()
    lugarDevolucion: string;

    @Column()
    precioFinal: number;

    @Column()
    cantidadDias: number;

    @ManyToOne(() => Car, car => car.alquiler)
    car: Car;

    @ManyToOne(() => Cliente, cliente => cliente.alquiler,{cascade: true})
    cliente: Cliente;
}