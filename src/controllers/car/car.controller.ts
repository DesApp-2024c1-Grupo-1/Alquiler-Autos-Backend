import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Car } from '../../models/Car';
import { CarService } from '../../services/car/car.service';
import { FiltrosDTO } from 'src/models/DTO/FiltrosDTO';
import { combustibleEnum } from 'src/models/enums/CombustibleEnum';
import { TransmisionEnum } from 'src/models/enums/TransmisionEnum';
import { CarDTO } from 'src/models/DTO/CarDTO';


@Controller()
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Get("/car")
  getAllCars(@Query() filtros:FiltrosDTO) : Promise<Car[]> {
    console.log("---------------[Get All Cars]-----------------")
    return this.carService.getAllCar(filtros);
  }

  @Post("/car")
  createCar(@Body() car: Car): Promise<CarDTO> {
    console.log("---------------[Create Car]-----------------")
    console.log(car)
    return this.carService.postCar(car);
  }

  @Put("/car/:id")
  updateCar(@Param('id') id: number, @Body() car: CarDTO): Promise<CarDTO> {
    console.log("---------------[Update Car]-----------------")
    console.log("ID: ", id)
    console.log(car)
    return this.carService.putCar(id, car);
  }

  @Delete("/car/:id")
  deleteCar(@Param('id') id: number): Promise<CarDTO> {
    return this.carService.deleteCar(id);
  }

  //Consultar que autos hay disponibles con todos los filtros incluyendo fechas, se usa POST para poder enviar un Body
  @Post("/car/available")
  getAllCarsAvailable(@Body() filtros:FiltrosDTO) : Promise<Car[]> {
    return this.carService.getAllCarAvailable(filtros);
  }

  @Get("/car/:id")
  getCarById(@Param('id') id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }
}
