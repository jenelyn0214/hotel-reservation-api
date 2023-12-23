import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
