import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagoDTO } from 'src/models/DTO/PagoDTO';
import { Pago } from 'src/models/Pago';
import { Repository } from 'typeorm';
import { AlquilerService } from '../alquiler/alquiler.service';
import { Alquiler } from 'src/models/Alquiler';

@Injectable()
export class PagoService {

    constructor(
        @InjectRepository(Pago) private readonly pagoRepository: Repository<Pago>,
        @InjectRepository(Alquiler) private readonly alquilerRepository: Repository<Alquiler>,
        private readonly alquilerService: AlquilerService,

    ) { }

    async registrarPago(id:number, pago: PagoDTO): Promise<Pago> {

        console.log("----------------[Service registrarPago]--------------------")

        const alquilerExistente: Alquiler = await this.alquilerService.getAlquilerEntityById(id);

        if (!alquilerExistente) {
            throw new Error("Alquiler no encontrado")
        }

        pago.fecha = new Date()

        pago.alquiler = alquilerExistente
        const pagoCreado: Pago = this.pagoRepository.create(pago);
        const pagoEntidad = await this.pagoRepository.save(pagoCreado);
        console.log("--------------------[Pago guardado]----------------------")
        console.log(pagoEntidad)

        return pagoEntidad;
    }
}
