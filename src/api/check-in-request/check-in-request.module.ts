import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { CheckInRequestController } from './check-in-request.controller';
import { CheckInRequestService } from './check-in-request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CheckInRequestController],
  providers: [CheckInRequestService],
  exports: [CheckInRequestService],
})
export class CheckInRequestModule {}
