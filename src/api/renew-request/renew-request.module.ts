import { Module } from '@nestjs/common';

import { PropertyManagementModule } from '@src/api/property-management/property-management.module';
import { DatabaseModule } from '@src/database/database.module';

import { RenewRequestController } from './renew-request.controller';
import { RenewRequestService } from './renew-request.service';

@Module({
  imports: [DatabaseModule, PropertyManagementModule],
  controllers: [RenewRequestController],
  providers: [RenewRequestService],
  exports: [RenewRequestService],
})
export class RenewRequestModule {}
