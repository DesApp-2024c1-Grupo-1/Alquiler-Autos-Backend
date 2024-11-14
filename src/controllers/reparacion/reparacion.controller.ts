import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ReparacionService} from 'src/services/reparacion/reparacion.service';
import { ReparacionDTO } from 'src/models/DTO/ReparacionDTO';

@Controller('reparacion')
export class ReparacionController {
    constructor(private readonly reparacionService: ReparacionService) {}

    // Crear una nueva reparación
    @Post()
    async crearReparacion(@Body() reparacionDTO: ReparacionDTO) {
        return await this.reparacionService.crearReparacion(reparacionDTO);
    }

    // Finalizar una reparación
    @Patch(':id/finalizar')
    async finalizarReparacion(
        @Param('id') id: number,
        @Body('fechaFin') fechaFin: Date,
    ) {
        return await this.reparacionService.finalizarReparacion(id, fechaFin);
    }

    // Obtener todas las reparaciones de un auto específico
    @Get('auto/:carId')
    async obtenerReparacionesPorAuto(@Param('carId') carId: number) {
        return await this.reparacionService.obtenerReparacionesPorAuto(carId);
    }

    // Obtener todas las reparaciones
    @Get()
    async obtenerTodasLasReparaciones() {
        return await this.reparacionService.obtenerTodasLasReparaciones();
    }
}