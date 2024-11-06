import { Car } from "../Car";

export class ReparacionDTO {

    id?: number;

    fechaInicio?: Date;

    fechaFin?: Date;

    cantidadDias?: number;
    
    razon?: string;
    
    car?: Car;

}