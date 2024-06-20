import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Column } from 'typeorm';
import { Alquiler } from './Alquiler';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nombre: string;

    @Column()
    documento: string;

    @Column()
    telefono: string;

    @Column({nullable: true})
    email: string;

    @OneToMany(() => Alquiler, (alquiler) => alquiler.cliente)
    alquiler: Alquiler[];

}