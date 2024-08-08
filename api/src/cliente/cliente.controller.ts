import { Body, Controller, Get, Post } from '@nestjs/common';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { CadastrarClienteDto } from './dto/cliente.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('listar')
  async listar(): Promise<Cliente[]> {
    return this.clienteService.listar();
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: CadastrarClienteDto): Promise<ResultadoDto> {
    return this.clienteService.cadastrar(data);
  }
}
