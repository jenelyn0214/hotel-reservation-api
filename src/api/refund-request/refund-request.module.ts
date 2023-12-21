import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { RefundRequestController } from './refund-request.controller';
import { RefundRequestService } from './refund-request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RefundRequestController],
  providers: [RefundRequestService],
  exports: [RefundRequestService],
})
export class RefundRequestModule {}
