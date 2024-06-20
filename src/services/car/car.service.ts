import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../../models/Car';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class CarService {

    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>
    ) { }

    async getAllCar(): Promise<Car[]> {
        console.log("getAllCar")
        return await this.carRepository.find();

    }

    async getCarById(id: number): Promise<Car> {
        console.log("getCarById, id: ", id)

        const car: Car = await this.carRepository.findOneBy({id});
        
        if(!car) {
            throw new NotFoundException("Car not found");
        }

        return car;
    }

}
