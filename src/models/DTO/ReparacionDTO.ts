import { Car } from "../Car";
import { Reparacion } from "../Reparacion";

export class ReparacionDTO {

    id?: string;

    fechaInicio?: Date;

    fechaFin?: Date;

    cantidadDias?: number;
    
    razon?: string;
    
    car?: Car;

    static toDTO(reparacionEntity: Reparacion): any {
        const dto = new ReparacionDTO();
        dto.id = reparacionEntity.id;
        dto.fechaInicio = reparacionEntity.fechaInicio;
        dto.fechaFin = reparacionEntity.fechaFin;
        dto.cantidadDias = reparacionEntity.cantidadDias;
        dto.car = reparacionEntity.car;
        return dto;
    }

}