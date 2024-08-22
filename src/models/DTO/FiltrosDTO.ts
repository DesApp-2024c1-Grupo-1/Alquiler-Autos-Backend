import { IsOptional, IsBoolean, IsEnum, Max, Min, ValidatorConstraint, IsDate } from 'class-validator';
import { combustibleEnum } from '../enums/CombustibleEnum';
import { TransmisionEnum } from '../enums/TransmisionEnum';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'isNumberString', async: false })
class isNumberStringConstraint {
    validate(value: any) {
        const numericValue = parseInt(value, 10);
        let response = !isNaN(numericValue) && numericValue >= 2 && numericValue <= 5;
        console.log("isNumberStringConstraint", response)
        return response
    }
}

export class FiltrosDTO {
    @IsOptional()
    @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value === undefined ? undefined : value === null ? undefined : 'Error')
    @IsBoolean({message: 'ac debe ser true o false'})
    ac: boolean;

    @IsOptional()
    @IsEnum(combustibleEnum, {message: 'El combustible debe ser Nafta, Electrico o GNC'})
    combustible: combustibleEnum;

    @IsOptional()
    @IsEnum(TransmisionEnum,{message: 'La transmision debe ser Manual o Automatica'})
    transmision: TransmisionEnum;
    
    @IsOptional()
    @Transform(({ value }) => isNaN(parseInt(value,10)) ? 1 : value) //Si no es un numero, se setea en 1
    @Min(1, {message: 'La capacidad debe ser un numero mayor a 1'})
    @Max(5, {message: 'La capacidad debe ser un numero menor a 6'})
    // @Validate(isNumberStringConstraint, {message: 'La capacidad debe ser un numero entre 2 y 5'})
    capacidad: number;

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate({message: 'La fecha de retiro debe ser una fecha'})
    fechaRetiro: Date;

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate({message: 'La fecha de devolucion debe ser una fecha'})
    fechaDevolucion: Date;
  
    constructor(ac: boolean, combustible: combustibleEnum, transmision: TransmisionEnum, capacidad: number, fechaRetiro: Date, fechaDevolucion: Date) {
        this.ac = ac;
        this.combustible = combustible;
        this.transmision = transmision;
        this.capacidad = capacidad
        this.fechaRetiro = fechaRetiro;
        this.fechaDevolucion = fechaDevolucion;
    }

}

