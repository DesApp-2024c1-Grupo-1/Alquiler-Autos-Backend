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


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Car, Cliente, Alquiler])
  ],
  controllers: [CarController, ClienteController, AlquilerController],
  providers: [AppService, CarService, ClienteService, AlquilerService]
})
export class AppModule {}
