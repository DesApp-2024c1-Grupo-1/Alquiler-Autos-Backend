import { Allow, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { AlquilerDTO } from "./AlquilerDTO";
import { Transform } from "class-transformer";


export class PagoDTO {
    
    @Transform((value) => new Date())
    fecha: Date;

    @IsNumber()
    monto: number;

    @IsOptional()
    @ValidateNested()
    alquiler: AlquilerDTO
}