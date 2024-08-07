import { Body, Controller, Get, Post } from '@nestjs/common';

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

  @Post('cadastrar')
  async cadastrar(@Body() data: CadastrarServicoDto): Promise<ResultadoDto> {
    return this.servicoService.cadastrar(data);
  }
}
