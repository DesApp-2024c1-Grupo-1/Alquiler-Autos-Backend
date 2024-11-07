import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from 'src/models/Alquiler';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ClienteService } from '../cliente/cliente.service';
import { EventoService } from '../evento/evento.service';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { ClienteDTO } from 'src/models/DTO/ClienteDTO';
import { Evento } from 'src/models/Evento';
import { EventoTypeEnum } from 'src/models/enums/EventoTypeEnum';
import { Cliente } from 'src/models/Cliente';
import { EventoAlquiler } from 'src/models/EventoAlquiler';


@Injectable()
export class AlquilerService {

  constructor(
    @InjectRepository(Alquiler) private readonly alquilerRepository: Repository<Alquiler>,
    private readonly clienteService: ClienteService,
    private readonly eventoService: EventoService,
  ) { }

  async postAlquiler(alquilerDTO: AlquilerDTO): Promise<AlquilerDTO> {

    console.log("----------------[Service postAlquiler]--------------------")
    const clienteExistente: ClienteDTO = await this.clienteService.getClientByDocumentConEliminados(alquilerDTO.cliente.documento);

    if (clienteExistente) {
      console.log("Cliente existente", clienteExistente)
      clienteExistente.nombre = alquilerDTO.cliente.nombre;
      clienteExistente.email = alquilerDTO.cliente.email;
      clienteExistente.telefono = alquilerDTO.cliente.telefono;
      clienteExistente.deletedAt = null;

      alquilerDTO.cliente = clienteExistente;
    } else {
      console.log("Cliente nuevo", alquilerDTO.cliente)
    }

    const alquilerCreado: Alquiler = this.alquilerRepository.create(alquilerDTO);
    const eventos: Evento[] = await this.eventoService.createEventosFromAlquiler(alquilerCreado);

    console.log("Eventos creados", eventos)

    alquilerCreado.eventos = eventos

    const alquilerEntidad = await this.alquilerRepository.save(alquilerCreado);
    const alquilerResponseDTO: AlquilerDTO = AlquilerDTO.toDTO(alquilerEntidad);

    console.log("--------------------[Alquiler guardado]----------------------")
    console.log(alquilerResponseDTO)

    return alquilerResponseDTO;
  }

  async getAlquilerDTOById(id: string): Promise<AlquilerDTO> {
    console.log(`------------[getAlquilerDTOById ${id}]------------`)
    const entity = await this.alquilerRepository.findOneOrFail({ relations: ['cliente', 'car', 'pagos'], where: { id } });
    return AlquilerDTO.toDTO(entity);
  }

  async getAlquilerEntityById(id: string): Promise<Alquiler> {
    console.log(`------------[getAlquilerEntityById ${id}]------------`)
    return await this.alquilerRepository.findOneOrFail({ relations: ['cliente', 'car', 'pagos', 'eventos'], where: { id } });
  }

  async getAllAlquileres(): Promise<AlquilerDTO[]> {
    const list = await this.alquilerRepository.find({ relations: ['cliente', 'car','pagos'] })
    return list.map(alquiler => AlquilerDTO.toDTO(alquiler))

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

  async putAlquilerById(alquilerDTO: AlquilerDTO, alquilerId: string): Promise<AlquilerDTO> {
    try {
      const alquilerExistente: Alquiler = await this.getAlquilerEntityById(alquilerId);
      if(!alquilerExistente){
        throw new BadRequestException("Alquiler no encontrado")
      }
      console.log(`------------[Alquiler con id ${alquilerId} encontrado:]------------`)
      console.log(alquilerExistente)

      const clienteExistente: Cliente = await this.clienteService.getClienteById(alquilerDTO.cliente.id)
      console.log(`------------[Cliente encontrado:]------------`)
      console.log(clienteExistente)

      //Busca los eventos antes de modificar el alquiler
      const eventosDelAlquiler: EventoAlquiler[] = await this.eventoService.findEventosbyAlquiler(alquilerExistente);
      console.log(`------------[Eventos del alquiler encontrados:]------------`)
      console.log(eventosDelAlquiler)


      //Modifica el cliente del alquiler
      clienteExistente.nombre = alquilerDTO.cliente.nombre;
      clienteExistente.documento = alquilerDTO.cliente.documento;
      clienteExistente.telefono = alquilerDTO.cliente.telefono;
      clienteExistente.email = alquilerDTO.cliente.email;

      //Modifica los datos del alquiler
      alquilerExistente.fechaRetiro = alquilerDTO.fechaRetiro;
      alquilerExistente.fechaDevolucion = alquilerDTO.fechaDevolucion;
      alquilerExistente.lugarDevolucion = alquilerDTO.lugarDevolucion;
      alquilerExistente.lugarRetiro = alquilerDTO.lugarRetiro;
      alquilerExistente.cantidadDias = alquilerDTO.cantidadDias;
      alquilerExistente.precioFinal = alquilerDTO.precioFinal;
      alquilerExistente.cliente = clienteExistente;
      console.log(`------------[Modificado el alquiler existente:]------------`)
      console.log(alquilerExistente)

      //Modifica los eventos del alquiler con los datos actualizados
      const eventosModificados = []

      eventosDelAlquiler.forEach(evento => {
        if (evento.type == EventoTypeEnum.Retiro_Alquiler) {
          evento.fecha = alquilerExistente.fechaRetiro;
        } else if (evento.type === EventoTypeEnum.Devolucion_Alquiler) {
          evento.fecha = alquilerExistente.fechaDevolucion;
        }
        evento.alquiler = alquilerExistente;
        eventosModificados.push(evento);
      })

      console.log(`------------[Eventos de alquiler modificados:]------------`)
      console.log(eventosModificados)

      alquilerExistente.eventos = eventosModificados;

      console.log(`------------[Entidad a guardar:]------------`)
      console.log(alquilerExistente)

      const saved = await this.alquilerRepository.save(alquilerExistente);
      console.log(`------------[Guardando el alquiler, cliente y eventos modificados:]------------`)
      return AlquilerDTO.toDTO(saved);

    } catch (e) {
      console.log(`------------[Error al modificar el alquiler con id ${alquilerId}]------------`)
      console.error(e)
    }
    
  }

  async deleteAlquiler(id: string): Promise<AlquilerDTO> {
    console.log("Service deleteCar", id)
    let alquiler: Alquiler = await this.getAlquilerEntityById(id);
    console.log("Alquiler", alquiler)
    const response = await this.alquilerRepository.softRemove(alquiler);
    console.log("Response", response)
    return alquiler;
}

}
