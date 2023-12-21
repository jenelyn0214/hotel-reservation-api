import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import twalaConfig from '@src/config/twala.config';

import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
  imports: [ConfigModule.forFeature(twalaConfig)],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
