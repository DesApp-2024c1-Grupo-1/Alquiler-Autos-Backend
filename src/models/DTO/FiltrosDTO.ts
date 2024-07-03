import { IsOptional, IsInt, IsBoolean, IsString, IsNumber, isNumberString, IsNumberString, IsBooleanString, isBooleanString, IsEnum, Max, Min, min, Validate, ValidatorConstraint, ValidationArguments } from 'class-validator';
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
    @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value === undefined ? undefined : 'Error')
    @IsBoolean({message: 'ac debe ser true o false'})
    ac: boolean;

    @IsOptional()
    @IsEnum(combustibleEnum, {message: 'El combustible debe ser Nafta, Electrico o GNC'})
    combustible: combustibleEnum;

    @IsOptional()
    @IsEnum(TransmisionEnum,{message: 'La transmision debe ser Manual o Automatica'})
    transmision: TransmisionEnum;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @Min(2, {message: 'La capacidad debe ser un numero entre 2 y 5'})
    @Max(5, {message: 'La capacidad debe ser un numero entre 2 y 5'})
    // @Validate(isNumberStringConstraint, {message: 'La capacidad debe ser un numero entre 2 y 5'})
    capacidad: number;
  
    constructor(ac: boolean, combustible: combustibleEnum, transmision: TransmisionEnum, capacidad: number){
        this.ac = ac;
        this.combustible = combustible;
        this.transmision = transmision;
        this.capacidad = capacidad
    }

}

function throwException(): any {
    throw new Error('Function not implemented.');
}

