import { Controller, Get, Param } from '@nestjs/common';
import { Car } from '../../models/Car';
import { CarService } from '../../services/car/car.service';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get("/car")
  getAllCars(): Promise<Car[]> {
    return this.carService.getAllCar();
  }

  @Get("/car/:id")
  getCarById(@Param('id') id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }
}
