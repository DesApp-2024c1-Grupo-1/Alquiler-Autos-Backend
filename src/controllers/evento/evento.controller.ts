import { Controller, Get } from '@nestjs/common';
import { Evento } from 'src/models/Evento';
import { EventoService } from 'src/services/evento/evento.service';

@Controller('evento')
export class EventoController {

    constructor(private eventoService: EventoService) {}
    
    @Get()
    getAllEventos(): Promise<Evento[]> {
        return this.eventoService.getAllEventos();
    }
}
