import { Module } from '@nestjs/common';

import { BusinessModule } from '@src/api/business/business.module';
import { DatabaseModule } from '@src/database/database.module';

import { BusinessRequestController } from './business-request.controller';
import { BusinessRequestService } from './business-request.service';

@Module({
  imports: [DatabaseModule, BusinessModule],
  controllers: [BusinessRequestController],
  providers: [BusinessRequestService],
  exports: [BusinessRequestService],
})
export class BusinessRequestModule {}
