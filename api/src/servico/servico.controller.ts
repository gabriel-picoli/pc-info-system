import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { ServicoService } from './servico.service';
import { CadastrarServicoDto } from './dto/servico.cadastrar';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Servico } from './servico.entity';

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get('listar')
  async listar(): Promise<Servico[]> {
    return this.servicoService.listar();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Servico> {
    const servico = await this.servicoService.buscarPorId(id);
    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    return servico;
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: CadastrarServicoDto): Promise<ResultadoDto> {
    return this.servicoService.cadastrar(data);
  }
}
