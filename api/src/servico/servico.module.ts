import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { Servico } from './servico.entity';
import { ClienteModule } from '../cliente/cliente.module';
import { DatabaseModule } from '../database/database.module'; // Importa o módulo de banco de dados

@Module({
  imports: [ClienteModule, DatabaseModule], // Adiciona os módulos necessários
  providers: [
    {
      provide: 'SERVICO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Servico),
      inject: ['DATA_SOURCE'],
    },
    ServicoService,
  ],
  controllers: [ServicoController],
  exports: [ServicoService],
})
export class ServicoModule {}
