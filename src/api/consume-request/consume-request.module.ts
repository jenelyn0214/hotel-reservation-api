import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { ConsumeRequestController } from './consume-request.controller';
import { ConsumeRequestService } from './consume-request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsumeRequestController],
  providers: [ConsumeRequestService],
  exports: [ConsumeRequestService],
})
export class ConsumeRequestModule {}
