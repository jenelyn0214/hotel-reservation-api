import { Module } from '@nestjs/common';

import { QueueModule } from '@src/api/queue/queue.module';
import { DatabaseModule } from '@src/database/database.module';

import { OrderController } from './oder.controller';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule, QueueModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
