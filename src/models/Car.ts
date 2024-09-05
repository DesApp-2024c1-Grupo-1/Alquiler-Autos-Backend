import { Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from "typeorm";
import { Alquiler } from "./Alquiler";
import { combustibleEnum } from "./enums/CombustibleEnum";
import { TransmisionEnum } from "./enums/TransmisionEnum";
import { Delete } from "@nestjs/common";

@Entity()
export class Car {
 
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({nullable: true})
    year: number;

    @Column({nullable: true})
    km: number;

    @Column({nullable: true})
    color: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    transmision: TransmisionEnum;

    @Column()
    combustible: combustibleEnum;

    @Column()
    ac: boolean;

    @Column()
    capacidad: number;

    @Column()
    patente: string;

    @Column({type: 'timestamp', nullable: true})
    fechaLanzamiento: Date;

    @OneToMany(() => Alquiler, (alquiler) => alquiler.car)
    alquiler: Alquiler[];

    @DeleteDateColumn()
    deletedAt: Date; 

    constructor(name: string, brand: string, year: number, km: number, color: string, price: number, image: string, transmision: TransmisionEnum, combustible: combustibleEnum, ac: boolean, capacidad: number, patente: string){
        this.name = name;
        this.brand = brand;
        this.year = year;
        this.km = km;
        this.color = color;
        this.price = price;
        this.image = image;
        this.transmision = transmision;
        this.combustible = combustible;
        this.ac = ac;
        this.capacidad = capacidad;
        this.patente = patente;
        this.fechaLanzamiento = this.fechaLanzamiento;
        
    }

}
