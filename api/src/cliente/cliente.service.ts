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
    const cliente = new Cliente();

    cliente.nome = data.nome;
    cliente.telefone = data.telefone;
    cliente.cpf = data.cpf;
    cliente.endereco = data.endereco;
    cliente.bairro = data.bairro;
    cliente.numero = data.numero;
    cliente.complemento = data.complemento;

    try {
      await this.clienteRepository.save(cliente);
      return {
        status: true,
        message: 'cliente cadastrado com sucesso',
      };
    } catch (err) {
      return {
        status: false,
        message: `erro ao cadastrar o cliente: ${err.message}`,
      };
    }
  }
}
