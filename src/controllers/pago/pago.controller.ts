import { Body, Controller, Param, Post } from '@nestjs/common';
import { PagoDTO } from 'src/models/DTO/PagoDTO';
import { Pago } from 'src/models/Pago';
import { PagoService } from 'src/services/pago/pago.service';

@Controller('pago')
export class PagoController {

    constructor(private readonly pagoService: PagoService) {}

    @Post('alquiler/:id')
    postPago(@Param('id') id: string, @Body() pagoDto : PagoDTO): Promise<Pago>{
        return this.pagoService.registrarPago(id,pagoDto);
    }
}
