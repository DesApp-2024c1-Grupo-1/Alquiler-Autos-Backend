import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cliente } from 'src/models/Cliente';
import { ClienteService } from 'src/services/cliente/cliente.service';

@Controller('client')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Get(":id")
    getClienteById(@Param('id') id: number): Promise<Cliente>{
        return this.clienteService.getClienteById(id);
    }
    
    // @Post()
    // postCliente(@Body() cliente:Cliente): Promise<Cliente>{
    //     return this.clienteService.postCliente(cliente);
    // }
}
