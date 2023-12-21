import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { IboardtisementController } from './iboardtisement.controller';
import { IboardtisementService } from './iboardtisement.service';

@Module({
  imports: [DatabaseModule],
  controllers: [IboardtisementController],
  providers: [IboardtisementService],
  exports: [IboardtisementService],
})
export class IboardtisementModule {}
