import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../models/Cliente';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>
    ){}

    async getClienteById(id: number): Promise<Cliente>{
        const cliente: Cliente = await this.clienteRepository.findOneBy({id});
        if(!cliente){
            throw new NotFoundException(`Cliente con id ${id} no encontrado`);
        }

        return cliente;
    }

    //Actualmente sin uso
    async postCliente(cliente: Cliente): Promise<Cliente>{

        const clienteExistente: Cliente = await this.getClientByDocument(cliente.documento);

        if(clienteExistente){
            clienteExistente.nombre = cliente.nombre;
            clienteExistente.telefono = cliente.telefono;
            clienteExistente.email = cliente.email;

            return await this.clienteRepository.save(clienteExistente);
        }

        if(cliente.documento == null || cliente.documento == ''){
            throw new BadRequestException('El documento es requerido');
        }
        return await this.clienteRepository.save(cliente);
    }

    async getClientByDocument(documento: string): Promise<Cliente>{
        
        const clienteExistente : Cliente = await this.clienteRepository.findOneBy({documento});

        // if(!clienteExistente){
        //     throw new NotFoundException(`Cliente con documento ${documento} no encontrado`);
        // }

        return clienteExistente;

    }


}
