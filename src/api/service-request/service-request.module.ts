import { Module } from '@nestjs/common';

import { ServiceModule } from '@src/api/service/service.module';
import { DatabaseModule } from '@src/database/database.module';

import { ServiceRequestController } from './service-request.controller';
import { ServiceRequestService } from './service-request.service';

@Module({
  imports: [DatabaseModule, ServiceModule],
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService],
  exports: [ServiceRequestService],
})
export class ServiceRequestModule {}
