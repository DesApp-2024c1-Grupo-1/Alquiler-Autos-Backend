import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Alquiler } from 'src/models/Alquiler';
import { AlquilerDTO } from 'src/models/DTO/AlquilerDTO';
import { AlquilerService } from 'src/services/alquiler/alquiler.service';

@Controller('alquiler')
export class AlquilerController {

    constructor(
        private readonly alquilerService: AlquilerService){}

    @Post()
    postAlquiler(@Body() alquilerDTO: AlquilerDTO): Promise<Alquiler>{
        console.log("Controller postAlquiler",alquilerDTO)
        return this.alquilerService.postAlquiler(alquilerDTO);
    }

    @Get(':id')
    getAlquilerById(@Param('id') id: number): Promise<Alquiler>{
        return this.alquilerService.getAlquilerById(id);
    }

    @Get()
    getAllAlquileres(): Promise<Alquiler[]>{
        return this.alquilerService.getAllAlquileres();
    }
}
