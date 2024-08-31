import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Alquiler } from 'src/models/Alquiler';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { AlquilerService } from 'src/services/alquiler/alquiler.service';

@Controller('alquiler')
export class AlquilerController {

    constructor(
        private readonly alquilerService: AlquilerService){}

    @Post()
    postAlquiler(@Body() alquilerDTO: AlquilerDTO): Promise<AlquilerDTO>{
        console.log("Controller postAlquiler",alquilerDTO)
        return this.alquilerService.postAlquiler(alquilerDTO);
    }

    @Post('/between')
    getAllAlquileresBetween(@Body() fechas:any): Promise<Alquiler[]>{
        return this.alquilerService.getAllAlquileresBetween(fechas.fechaRetiro,fechas.fechaDevolucion);
    }

    @Get(':id')
    getAlquilerById(@Param('id') id: number): Promise<Alquiler>{
        return this.alquilerService.getAlquilerById(id);
    }

    @Get()
    getAllAlquileres(): Promise<Alquiler[]>{
        return this.alquilerService.getAllAlquileres();
    }

    // @Put(':id')
    // putAlquilerByEventoId(@Body() alquilerDTO: AlquilerDTO, @Param('id') alquilerId: number): Promise<Alquiler>{
    //     console.log("------------[putAlquilerByEventoId]------------")
    //     return this.alquilerService.putAlquilerById(alquilerDTO,alquilerId);
    // }
}
