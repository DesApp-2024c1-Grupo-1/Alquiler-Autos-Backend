import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Alquiler } from "./Alquiler";

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
    transmision: string;

    @Column()
    combustible: string;

    @Column()
    ac: boolean;

    @Column()
    capacidad: number;

    @Column()
    patente: string;

    @OneToMany(() => Alquiler, (alquiler) => alquiler.car)
    alquiler: Alquiler[];

}
