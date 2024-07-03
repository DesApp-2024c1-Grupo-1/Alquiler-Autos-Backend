import { IsInt, Max, Min, ValidateNested } from "class-validator";
import { Car } from "../Car";
import { ClienteDTO } from "./ClienteDTO";
import { Type } from "class-transformer";

export class AlquilerDTO {

    id?: number;

    fechaRetiro?: Date;

    lugarRetiro?: string;

    fechaDevolucion?: Date;

    lugarDevolucion?: string;

    precioFinal?: number;

    @IsInt()
    @Min(1)
    @Max(2)
    cantidadDias?: number;

    car?: Car;

    @Type(() => ClienteDTO)
    @ValidateNested()
    cliente?: ClienteDTO;

}

