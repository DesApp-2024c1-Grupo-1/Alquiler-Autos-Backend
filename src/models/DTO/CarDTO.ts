import { IsInt, Max, Min, ValidateNested } from "class-validator";
import { Car } from "../Car";
import { ClienteDTO } from "./ClienteDTO";
import { Type } from "class-transformer";

export class CarDTO {

    id?: number;

    name?: string;

    brand?: string;

    year?: number;
    
    km?: number;
    
    color?: string;
    
    price?: number;
    
    image?: string;
    
    transmision?: TransmisionEnum;
    
    combustible?: combustibleEnum;
    
    ac?: boolean;
    
    capacidad?: number;
    
    patente?: string;

    lugarDevolucion?: string;

    precioFinal?: number;
}
