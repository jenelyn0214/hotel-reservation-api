import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { PropertyServiceRequestController } from './property-service-request.controller';
import { PropertyServiceRequestService } from './property-service-request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PropertyServiceRequestController],
  providers: [PropertyServiceRequestService],
  exports: [PropertyServiceRequestService],
})
export class PropertyServiceRequestModule {}
