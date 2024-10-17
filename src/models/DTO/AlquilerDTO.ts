import { IsInt, Max, Min, ValidateNested } from "class-validator";
import { Car } from "../Car";
import { ClienteDTO } from "./ClienteDTO";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { Alquiler } from "../Alquiler";
import { Pago } from "../Pago";

export class AlquilerDTO {

    id?: number;

    fechaRetiro?: Date;

    lugarRetiro?: string;

    fechaDevolucion?: Date;

    lugarDevolucion?: string;

    precioFinal?: number;

    saldoPendiente?: number;

    @IsInt()
    @Min(1)
    cantidadDias?: number;

    car?: Car;

    @Transform(({ value }: TransformFnParams) => ClienteDTO.toDTO(value))
    @ValidateNested()
    cliente?: ClienteDTO;

    pagos? : Pago[];

    static toDTO(alquilerEntity: Alquiler): any {
        console.log("Prueba 0.5", alquilerEntity)
        if(!alquilerEntity.pagos){
            alquilerEntity.pagos = []
        }
        console.log("Prueba 1")
        const dto = new AlquilerDTO();
        dto.id = alquilerEntity.id;
        dto.fechaRetiro = alquilerEntity.fechaRetiro;
        dto.lugarRetiro = alquilerEntity.lugarRetiro;
        dto.fechaDevolucion = alquilerEntity.fechaDevolucion;
        dto.lugarDevolucion = alquilerEntity.lugarDevolucion;
        dto.precioFinal = alquilerEntity.precioFinal;
        dto.cantidadDias = alquilerEntity.cantidadDias;
        dto.car = alquilerEntity.car;
        dto.cliente = alquilerEntity.cliente;
        console.log("Prueba 2")
        dto.pagos = alquilerEntity.pagos;
        console.log(alquilerEntity)
        console.log("Pagos",alquilerEntity.pagos)
        dto.saldoPendiente = alquilerEntity.precioFinal - alquilerEntity.pagos.reduce((acc, pago) => acc + pago.monto, 0) //Calculo del saldo pendiente
        return dto;
    }


}

