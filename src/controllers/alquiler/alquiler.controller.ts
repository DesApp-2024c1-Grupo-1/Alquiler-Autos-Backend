import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
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
    getAlquilerById(@Param('id') id: string): Promise<AlquilerDTO>{
        return this.alquilerService.getAlquilerDTOById(id);
    }

    @Get()
    getAllAlquileres(): Promise<AlquilerDTO[]>{
        return this.alquilerService.getAllAlquileres();
    }

    @Put(':id')
    putAlquilerByEventoId(@Body() alquilerDTO: AlquilerDTO, @Param('id') alquilerId: string): Promise<AlquilerDTO>{
        return this.alquilerService.putAlquilerById(alquilerDTO,alquilerId);
    }

    @Delete(":id")
    deleteAlquiler(@Param('id') id: string): Promise<AlquilerDTO> {
      return this.alquilerService.deleteAlquiler(id);
    }

}
