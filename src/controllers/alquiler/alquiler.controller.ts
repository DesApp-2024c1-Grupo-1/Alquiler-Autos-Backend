import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Alquiler } from 'src/models/Alquiler';
import { AlquilerService } from 'src/services/alquiler/alquiler.service';

@Controller('alquiler')
export class AlquilerController {

    constructor(
        private readonly alquilerService: AlquilerService){}

    @Post()
    postAlquiler(@Body() alquiler: Alquiler): Promise<Alquiler>{
        return this.alquilerService.postAlquiler(alquiler);
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
