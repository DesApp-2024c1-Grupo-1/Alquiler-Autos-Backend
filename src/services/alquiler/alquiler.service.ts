import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { Cliente } from 'src/models/Cliente';
import { Repository } from 'typeorm';
import { ClienteService } from '../cliente/cliente.service';
import { EventoService } from '../evento/evento.service';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { ClienteDTO } from 'src/models/DTO/ClienteDTO';


@Injectable()
export class AlquilerService {
    constructor(
        @InjectRepository(Alquiler) private readonly alquilerRepository: Repository<Alquiler>,
        private readonly clienteService: ClienteService,
        private readonly eventoService: EventoService,
    ) { }

    async postAlquiler(alquilerDTO: AlquilerDTO): Promise<Alquiler> {


        const clienteExistente: ClienteDTO = await this.clienteService.getClientByDocument(alquilerDTO.cliente.documento);
        if (clienteExistente) {
            clienteExistente.nombre = alquilerDTO.cliente.nombre;
            clienteExistente.email = alquilerDTO.cliente.email;
            clienteExistente.telefono = alquilerDTO.cliente.telefono;

            alquilerDTO.cliente = clienteExistente;
        }

        const alquilerPersistido = await this.alquilerRepository.save(alquilerDTO);

        this.eventoService.createEventosFromAlquiler(alquilerPersistido);

        return alquilerPersistido;
    }

    async getAlquilerById(id: number): Promise<Alquiler> {
        return this.alquilerRepository.findOne({ relations: ['cliente', 'car'], where: { id } });
    }

    async getAllAlquileres(): Promise<Alquiler[]> {
        return this.alquilerRepository.find({ relations: ['cliente', 'car'] });
    }
}
