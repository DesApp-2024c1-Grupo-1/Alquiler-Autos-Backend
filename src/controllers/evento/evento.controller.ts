import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { EventoDTO } from 'src/models/DTO/EventoDTO';
import { EventoService } from 'src/services/evento/evento.service';

@Controller('evento')
export class EventoController {

    constructor(private eventoService: EventoService) {}
    
    @Get()
    async getAllEventos(): Promise<EventoDTO[]> {
        return await this.eventoService.getAllEventos();
    }

    @Get(':id')
    async getEventoById(@Param('id') id:number): Promise<EventoDTO> {
        return await this.eventoService.getEventobyId(id)
    }
    // @Put(':id')
    // putEventoById(@Param() id:number, @Body() evento:Evento): Promise<Evento> {
    //     return this.eventoService.putEventoById(id,evento);
    // }
    
}


