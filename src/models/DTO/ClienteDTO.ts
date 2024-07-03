import { IsOptional, IsInt, IsBoolean, IsString, IsNumber, isNumberString, IsNumberString, IsBooleanString, isBooleanString, IsEnum, Max, Min, min, Validate, ValidatorConstraint, ValidationArguments, IsEmail, minLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { Alquiler } from '../Alquiler';
import { Cliente } from '../Cliente';


export class ClienteDTO {

    id: number

    @IsString()
    @MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
    nombre: string;

    @IsString()
    @MinLength(7,{message: 'El documento debe tener al menos 7 caracteres'})
    documento: string;

    @IsString()
    @MinLength(7, {message: 'El telefono debe tener al menos 7 caracteres'})
    telefono: string;

    @Transform(({ value }) => value === undefined ? undefined : value === '' ? undefined : value)
    @IsOptional()
    @IsEmail({}, {message: 'El email debe ser un email valido'})
    email: string;

    
}
