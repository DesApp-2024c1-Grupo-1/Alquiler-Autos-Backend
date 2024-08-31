import { BadRequestException, Injectable } from '@nestjs/common';
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

  async postAlquiler(alquilerDTO: AlquilerDTO): Promise<AlquilerDTO> {

    console.log("----------------[Service postAlquiler]--------------------")
    const clienteExistente: ClienteDTO = await this.clienteService.getClientByDocument(alquilerDTO.cliente.documento);

    if (clienteExistente) {
      console.log("Cliente existente", clienteExistente)
      clienteExistente.nombre = alquilerDTO.cliente.nombre;
      clienteExistente.email = alquilerDTO.cliente.email;
      clienteExistente.telefono = alquilerDTO.cliente.telefono;

      alquilerDTO.cliente = clienteExistente;
    } else {
      console.log("Cliente nuevo", alquilerDTO.cliente)
    }

    const alquilerCreado:Alquiler = this.alquilerRepository.create(alquilerDTO);
    const eventos: Evento[] = await this.eventoService.createEventosFromAlquiler(alquilerCreado);

    console.log("Eventos creados", eventos)

    alquilerCreado.eventos = eventos

    const alquilerEntidad = await this.alquilerRepository.save(alquilerCreado);
    const alquilerResponseDTO: AlquilerDTO = AlquilerDTO.toDTO(alquilerEntidad);

    console.log("--------------------[Alquiler guardado]----------------------")
    console.log(alquilerResponseDTO)

    return alquilerResponseDTO;
  }

  async getAlquilerById(id: number): Promise<Alquiler> {
    console.log(`------------[getAlquilerById ${id}]------------`)
    return this.alquilerRepository.findOne({ relations: ['cliente', 'car'], where: { id } });
  }

  async getAllAlquileres(): Promise<Alquiler[]> {
    return this.alquilerRepository.find({ relations: ['cliente', 'car'] });
  }

  async getAllAlquileresBetween(fechaRetiro, fechaDevolucion): Promise<Alquiler[]> {
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

  // async putAlquilerById(alquilerDTO: AlquilerDTO, alquilerId: number): Promise<Alquiler> {
  //   console.log("------------[alquilerService.putAlquilerByEventoId]------------")

  //   console.log(`------------[Buscando Alquiler con id ${alquilerId}]------------`)
  //   const alquilerExistente: Alquiler = await this.getAlquilerById(alquilerId);

  //   if (!alquilerExistente) {
  //     throw new BadRequestException("No existe un alquiler con el id " + alquilerExistente.id)
  //   }

  //   console.log(`------------[Alquiler con id ${alquilerId} encontrado: ${alquilerExistente.car.name} ]------------`)

  //   //Busca los eventos antes de modificar el alquiler
    
  //   const eventosDelAlquiler = await this.eventoService.findEventosbyAlquiler(alquilerExistente); 
  //   console.log(`------------[Eventos del alquiler encontrados:]------------`)
  //   console.log(eventosDelAlquiler)
 
    
  //   //Modifica los datos del alquiler
    
  //   alquilerExistente.fechaRetiro = alquilerDTO.fechaRetiro;
  //   alquilerExistente.fechaDevolucion = alquilerDTO.fechaDevolucion;
  //   alquilerExistente.lugarDevolucion = alquilerDTO.lugarDevolucion;
  //   alquilerExistente.lugarRetiro = alquilerDTO.lugarRetiro;
  //   alquilerExistente.cantidadDias = alquilerDTO.cantidadDias;
  //   alquilerExistente.precioFinal = alquilerDTO.precioFinal;
  //   console.log(`------------[Modificado el alquiler existente: ${alquilerExistente}]------------`)

  //   //Modifica los eventos del alquiler con los datos actualizados

  //   const eventosModificados = []

  //   eventosDelAlquiler.forEach(evento => {
  //     if (evento.type === "Retiro") {
  //       evento.start = alquilerExistente.fechaRetiro;
  //       evento.end = alquilerExistente.fechaRetiro;
  //     } else if (evento.type === "Devolucion") {
  //       evento.start = alquilerExistente.fechaDevolucion;
  //       evento.end = alquilerExistente.fechaDevolucion;
  //     }
  //     evento.data = alquilerExistente;
  //     eventosModificados.push(evento);
  //   })
    
  //   console.log(`------------[Guardando los eventos de alquiler modificados:]------------`)
  //   console.log(eventosModificados)
  //   this.eventoService.saveEventos(eventosModificados);

  //   return this.alquilerRepository.save(alquilerExistente);
  // }

}
