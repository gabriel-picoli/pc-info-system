import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { servicoProviders } from './servico.providers';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...servicoProviders, ServicoService],
  controllers: [ServicoController],
})
export class ServicoModule {}
