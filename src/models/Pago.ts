import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Alquiler } from "./Alquiler";

@Entity()
export class Pago {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fecha: Date;

    @Column()
    monto: number;

    @ManyToOne(() => Alquiler, alquiler => alquiler.pagos)
    @JoinColumn()
    alquiler: Alquiler
}