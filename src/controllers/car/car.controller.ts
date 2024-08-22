import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Car } from '../../models/Car';
import { CarService } from '../../services/car/car.service';
import { FiltrosDTO } from 'src/models/DTO/FiltrosDTO';
import { combustibleEnum } from 'src/models/enums/CombustibleEnum';
import { TransmisionEnum } from 'src/models/enums/TransmisionEnum';


@Controller()
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Get("/car")
  getAllCars(@Query() filtros:FiltrosDTO) : Promise<Car[]> {
    return this.carService.getAllCar(filtros);
  }

  @Post("/car/available")
  getAllCarsAvailable(@Body() filtros:FiltrosDTO) : Promise<Car[]> {
    return this.carService.getAllCarAvailable(filtros);
  }

  @Get("/car/:id")
  getCarById(@Param('id') id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }
}
