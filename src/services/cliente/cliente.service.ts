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
        try {
            return await this.clienteRepository.findOneOrFail({where: {id}});
        } catch (error) {
            console.log("----------------[Error getClienteById]----------------")
            console.error(error)
        }
      
    }

    //Actualmente sin uso
    // async postCliente(cliente: Cliente): Promise<Cliente>{

    //     const clienteExistente: Cliente = await this.getClientByDocument(cliente.documento);

    //     if(clienteExistente){
    //         clienteExistente.nombre = cliente.nombre;
    //         clienteExistente.telefono = cliente.telefono;
    //         clienteExistente.email = cliente.email;

    //         return await this.clienteRepository.save(clienteExistente);
    //     }

    //     if(cliente.documento == null || cliente.documento == ''){
    //         throw new BadRequestException('El documento es requerido');
    //     }
    //     return await this.clienteRepository.save(cliente);
    // }

    async getClientByDocument(documento: string): Promise<Cliente>{
        
        return  await this.clienteRepository.findOneBy({documento});;

    }

    async getClientByDocumentConEliminados(documento: string): Promise<Cliente>{
        
        return  await this.clienteRepository
        .createQueryBuilder('cliente')
        .withDeleted()
        .where('cliente.documento = :documento', {documento})
        .getOne();

    }



}
