import { Module } from '@nestjs/common';

import { PropertyManagementModule } from '@src/api/property-management/property-management.module';
import { DatabaseModule } from '@src/database/database.module';

import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [DatabaseModule, PropertyManagementModule],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
