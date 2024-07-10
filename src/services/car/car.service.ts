import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '../../models/Car';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FiltrosDTO } from 'src/models/DTO/FiltrosDTO';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class CarService {

    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>
    ) { }

    async getAllCar(filtros:FiltrosDTO): Promise<Car[]> {

        filtros.capacidad = filtros.capacidad ? filtros.capacidad : 0;
 
        return await this.carRepository.findBy({ ac: filtros.ac, combustible: filtros.combustible, transmision: filtros.transmision, capacidad: MoreThanOrEqual(filtros.capacidad)
        });

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

