import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { Column } from 'typeorm';
import { Alquiler } from './Alquiler';
import { ClienteDTO } from './DTO/ClienteDTO';

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

    @DeleteDateColumn()
    deletedAt: Date; 

    static toEntity(cliente: ClienteDTO): Cliente {
        const entity = new Cliente();
        entity.id = cliente.id;
        entity.nombre = cliente.nombre;
        entity.documento = cliente.documento;
        entity.telefono = cliente.telefono;
        entity.email = cliente.email;
        return entity;
    }

}