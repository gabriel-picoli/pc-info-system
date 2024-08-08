import { Module } from '@nestjs/common';

import { ClienteModule } from './cliente/cliente.module';
import { ServicoModule } from './servico/servico.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ClienteModule, ServicoModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
