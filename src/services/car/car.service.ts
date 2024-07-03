import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../../models/Car';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FiltrosDTO } from 'src/models/DTO/FiltrosDTO';

@Injectable()
export class CarService {

    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>
    ) { }

    async getAllCar(filtros:FiltrosDTO): Promise<Car[]> {
        // console.log("getAllCar")
        // console.log("filtros: ", filtros)
 
        return await this.carRepository.findBy({ ac: filtros.ac, combustible: filtros.combustible, transmision: filtros.transmision, capacidad: filtros.capacidad });

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
