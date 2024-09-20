import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Car } from "./Car";
import { Cliente } from "./Cliente";
import { Evento } from "./Evento";
import { AlquilerDTO } from "./DTO/AlquilerDTO";
import { Pago } from "./Pago";

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

    @OneToMany(() => Evento, (evento) => evento.alquiler,{cascade: true})
    eventos: Evento[];

    @OneToMany(() => Pago, (pago) => pago.alquiler,{cascade: true})
    pagos: Pago[];

    static toEntity(alquilerDTO: AlquilerDTO): Alquiler {
        const entity = new Alquiler();
        entity.id = alquilerDTO.id;
        entity.fechaRetiro = alquilerDTO.fechaRetiro;
        entity.lugarRetiro = alquilerDTO.lugarRetiro;
        entity.fechaDevolucion = alquilerDTO.fechaDevolucion;
        entity.lugarDevolucion = alquilerDTO.lugarDevolucion;
        entity.precioFinal = alquilerDTO.precioFinal;
        entity.cantidadDias = alquilerDTO.cantidadDias;
        entity.car = alquilerDTO.car;
        entity.cliente = Cliente.toEntity(alquilerDTO.cliente);
        // entity.eventos = alquilerDTO.eventos; //TODO: Fix this
        return entity;
    }

}