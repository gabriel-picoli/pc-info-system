import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Cliente } from './cliente.entity';
import { CadastrarClienteDto } from './dto/cliente.cadastrar.dto';
import { ResultadoDto } from 'src/dto/resultado.dto';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {}

  async listar(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async cadastrar(data: CadastrarClienteDto): Promise<ResultadoDto> {
    const cliente = this.clienteRepository.create(data);

    try {
      await this.clienteRepository.save(cliente);
      return this.repostaSucesso('cliente cadastrado com sucesso');
    } catch (err) {
      return this.repostaErro(`erro ao cadastrar cliente: ${err.message}`);
    }
  }

  private repostaSucesso(message: string): ResultadoDto {
    return {
      status: true,
      message,
    };
  }

  private repostaErro(message: string): ResultadoDto {
    return {
      status: false,
      message,
    };
  }
}
