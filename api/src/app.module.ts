import { Module } from '@nestjs/common';

import { ClienteModule } from './cliente/cliente.module';
import { ServicoService } from './servico/servico.service';
import { ServicoModule } from './servico/servico.module';

@Module({
  imports: [ClienteModule, ServicoModule],
  controllers: [],
  providers: [ServicoService],
})
export class AppModule {}
