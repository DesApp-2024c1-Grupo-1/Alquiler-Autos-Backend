import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Car } from "./Car";
import { Cliente } from "./Cliente";
import { ClienteDTO } from "./DTO/ClienteDTO";

@Entity()
export class Alquiler {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'timestamp', nullable: true})
    fechaRetiro: Date;

    @Column()
    lugarRetiro: string;

    @Column({type: 'timestamp', nullable: true})
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

    // constructor(fechaRetiro: Date, lugarRetiro: string, fechaDevolucion: Date, lugarDevolucion: string, precioFinal: number, cantidadDias: number, car: Car, cliente: Cliente){
    //     this.fechaRetiro = fechaRetiro;
    //     this.lugarRetiro = lugarRetiro;
    //     this.fechaDevolucion = fechaDevolucion;
    //     this.lugarDevolucion = lugarDevolucion;
    //     this.precioFinal = precioFinal;
    //     this.cantidadDias = cantidadDias;
    //     this.car = car;
    //     this.cliente = cliente;
    // }
}