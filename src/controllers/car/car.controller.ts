import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Query } from '@nestjs/common';
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

  @Get("/car/:id")
  getCarById(@Param('id') id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }
}
