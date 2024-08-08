import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Servico } from './servico.entity';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { CadastrarServicoDto } from './dto/servico.cadastrar';
import { Cliente } from 'src/cliente/cliente.entity';

@Injectable()
export class ServicoService {
  constructor(
    @Inject('SERVICO_REPOSITORY')
    private readonly servicoRepository: Repository<Servico>,
    @Inject('CLIENTE_REPOSITORY')
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async listar(): Promise<Servico[]> {
    return this.servicoRepository.find({ relations: ['cliente'] });
  }

  async buscarPorId(id: number): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

    return servico;
  }

  async cadastrar(data: CadastrarServicoDto): Promise<ResultadoDto> {
    const cliente = await this.clienteRepository.findOneBy({
      id: data.clienteId,
    });

    if (!cliente) {
      return {
        status: false,
        message: 'cliente nao encontrado',
      };
    }

    const servico = await this.servicoRepository.create({
      descricao: data.descricao,
      data: data.data,
      valor: data.valor,
      cliente,
    });

    try {
      await this.servicoRepository.save(servico);
      return this.repostaSucesso('serviço cadastrado com sucesso');
    } catch (err) {
      return this.repostaErro(`erro ao cadastrar o serviço: ${err.message}`);
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
