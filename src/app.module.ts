import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CarService } from './services/car/car.service';
import { CarController } from './controllers/car/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './models/Car';
import { dbConfig } from './dbconfig';
import { ClienteService } from './services/cliente/cliente.service';
import { ClienteController } from './controllers/cliente/cliente.controller';
import { Cliente } from './models/Cliente';
import { Alquiler } from './models/Alquiler';
import { AlquilerController } from './controllers/alquiler/alquiler.controller';
import { AlquilerService } from './services/alquiler/alquiler.service';
import { EventoService } from './services/evento/evento.service';
import { Evento } from './models/Evento';
import { EventoController } from './controllers/evento/evento.controller';
import { Pago } from './models/Pago';
import { PagoService } from './services/pago/pago.service';
import { PagoController } from './controllers/pago/pago.controller';
import { ReparacionController } from './controllers/reparacion/reparacion.controller';
import { ReparacionService } from './services/reparacion/reparacion.service';
import { Reparacion } from './models/Reparacion';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Car, Cliente, Alquiler, Evento, Pago, Reparacion])
  ],
  controllers: [CarController, ClienteController, AlquilerController, EventoController, PagoController, ReparacionController],
  providers: [AppService, CarService, ClienteService, AlquilerService, EventoService, PagoService, ReparacionService]
})
export class AppModule {}
