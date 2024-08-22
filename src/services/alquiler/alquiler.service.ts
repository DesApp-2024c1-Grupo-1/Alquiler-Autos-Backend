import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ClienteService } from '../cliente/cliente.service';
import { EventoService } from '../evento/evento.service';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { ClienteDTO } from 'src/models/DTO/ClienteDTO';
import { Evento } from 'src/models/Evento';


@Injectable()
export class AlquilerService {
    constructor(
        @InjectRepository(Alquiler) private readonly alquilerRepository: Repository<Alquiler>,
        private readonly clienteService: ClienteService,
        private readonly eventoService: EventoService,
    ) { }

    async postAlquiler(alquilerDTO: AlquilerDTO): Promise<Alquiler> {

        console.log("Service postAlquiler")
        const clienteExistente: ClienteDTO = await this.clienteService.getClientByDocument(alquilerDTO.cliente.documento);
        
        if (clienteExistente) {
            console.log("Cliente existente", clienteExistente)
            clienteExistente.nombre = alquilerDTO.cliente.nombre;
            clienteExistente.email = alquilerDTO.cliente.email;
            clienteExistente.telefono = alquilerDTO.cliente.telefono;

            alquilerDTO.cliente = clienteExistente;
        }else{
            console.log("Cliente nuevo", alquilerDTO.cliente)
        }

        const alquilerPersistido = await this.alquilerRepository.save(alquilerDTO);
        console.log("Alquiler persistido", alquilerPersistido)

       const eventos: Evento[] = await this.eventoService.createEventosFromAlquiler(alquilerPersistido);
       console.log("Eventos", eventos)

        return alquilerPersistido;
    }

    async getAlquilerById(id: number): Promise<Alquiler> {
        return this.alquilerRepository.findOne({ relations: ['cliente', 'car'], where: { id } });
    }

    async getAllAlquileres(): Promise<Alquiler[]> {
        return this.alquilerRepository.find({ relations: ['cliente', 'car'] });
    }

    async getAllAlquileresBetween(fechaRetiro,fechaDevolucion): Promise<Alquiler[]> {
        console.log("Buscando alquileres del ", fechaRetiro, " al ", fechaDevolucion)
        
        return this.alquilerRepository.find({
            where: [
              {
                fechaRetiro: Between(fechaRetiro, fechaDevolucion),
              },
              {
                fechaDevolucion: Between(fechaRetiro, fechaDevolucion),
              },
              {
                fechaRetiro: LessThanOrEqual(fechaRetiro),
                fechaDevolucion: MoreThanOrEqual(fechaRetiro),
              },
              {
                fechaRetiro: LessThanOrEqual(fechaDevolucion),
                fechaDevolucion: MoreThanOrEqual(fechaDevolucion),
              },
            ],
            relations: ['cliente', 'car'] 
            }
        );
    }
    
}
