import { Exclude, Transform } from "class-transformer";
import { Alquiler } from "../Alquiler";
import { EventoTypeEnum } from "../enums/EventoTypeEnum";
import { Evento } from "../Evento";
import { AlquilerDTO } from "./AlquilerDTO";
import { ReparacionDTO } from "./ReparacionDTO";


export class EventoDTO{

    id: number;

    start: Date;

    end: Date;

    text: string;

    color: string;

    type: EventoTypeEnum;

    @Transform((alquiler) => AlquilerDTO.toDTO(alquiler.value))
    alquiler: AlquilerDTO;

    @Transform((reparacion) => ReparacionDTO.toDTO(reparacion.value))
    reparacion: ReparacionDTO;

    constructor() {}

    static toDTO(evento:Evento): EventoDTO{
        console.log("----------------[Evento toDTO - Inicio]----------------")
        const eventoDTO = new EventoDTO();
        eventoDTO.id = evento.id;
        eventoDTO.start = evento.fecha;
        eventoDTO.end = evento.fecha;
        eventoDTO.text = evento.text;
        eventoDTO.color = evento.color;
        eventoDTO.type = evento.type;
        // eventoDTO.entidadId = evento.entidadId;
        // eventoDTO.reparacion = AlquilerDTO.toDTO(evento.reparacion);
        console.log("----------------[Evento toDTO - Fin]----------------")
        return eventoDTO;
    }

}

