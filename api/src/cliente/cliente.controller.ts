import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { CadastrarClienteDto } from './dto/cliente.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { AtualizarClienteDto } from './dto/cliente.atualizar.dto';

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

  @Put('atualizar/:id')
  async atualizar(
    @Param('id') id: number,
    @Body() atualizarClienteDto: AtualizarClienteDto,
  ) {
    return this.clienteService.atualizar(id, atualizarClienteDto);
  }
}
