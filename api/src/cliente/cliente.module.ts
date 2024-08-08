import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { clienteProviders } from './cliente.providers';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...clienteProviders, ClienteService],
  controllers: [ClienteController],
  exports: [...clienteProviders, ClienteService],
})
export class ClienteModule {}
