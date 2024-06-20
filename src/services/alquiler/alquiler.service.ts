import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { Cliente } from 'src/models/Cliente';
import { Repository } from 'typeorm';
import { ClienteService } from '../cliente/cliente.service';


@Injectable()
export class AlquilerService {
    constructor(
        @InjectRepository(Alquiler) private readonly alquilerRepository: Repository<Alquiler>,
        // @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
        private readonly clienteService: ClienteService
    ) {}

    async postAlquiler(alquiler: Alquiler): Promise<Alquiler> {

        const clienteExistente: Cliente = await this.clienteService.getClientByDocument(alquiler.cliente.documento);
        if(clienteExistente){
            clienteExistente.nombre = alquiler.cliente.nombre;
            clienteExistente.email = alquiler.cliente.email;
            clienteExistente.telefono = alquiler.cliente.telefono;
            
            alquiler.cliente = clienteExistente;
        }
        
        return this.alquilerRepository.save(alquiler);
    }

    async getAlquilerById(id: number): Promise<Alquiler> {
        return this.alquilerRepository.findOne({relations: ['cliente', 'car'], where: {id}});
    }

    async getAllAlquileres(): Promise<Alquiler[]> {
        return this.alquilerRepository.find({relations: ['cliente', 'car']});
    }
}
