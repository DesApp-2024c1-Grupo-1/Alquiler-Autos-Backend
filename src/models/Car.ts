import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Alquiler } from "./Alquiler";
import { combustibleEnum } from "./enums/CombustibleEnum";
import { TransmisionEnum } from "./enums/TransmisionEnum";

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

    @OneToMany(() => Alquiler, (alquiler) => alquiler.car)
    alquiler: Alquiler[];

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
        
    }

}
