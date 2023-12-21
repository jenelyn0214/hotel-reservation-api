import { Module } from '@nestjs/common';

import { PropertyManagementModule } from '@src/api/property-management/property-management.module';
import { DatabaseModule } from '@src/database/database.module';

import { RentController } from './rent.controller';
import { RentService } from './rent.service';

@Module({
  imports: [DatabaseModule, PropertyManagementModule],
  controllers: [RentController],
  providers: [RentService],
  exports: [RentService],
})
export class RentModule {}
