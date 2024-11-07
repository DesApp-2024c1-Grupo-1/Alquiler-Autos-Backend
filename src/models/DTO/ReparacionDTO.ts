import { Car } from "../Car";

export class ReparacionDTO {
    static toDTO(value: any): any {
        throw new Error("Method not implemented.");
    }

    id?: string;

    fechaInicio?: Date;

    fechaFin?: Date;

    cantidadDias?: number;
    
    razon?: string;
    
    car?: Car;

}