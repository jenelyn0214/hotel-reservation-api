import { Module } from '@nestjs/common';

import { PropertyModule } from '@src/api/property/property.module';
import { RoomRequestModule } from '@src/api/room-request/room-request.module';
import { DatabaseModule } from '@src/database/database.module';

import { PropertyRequestController } from './property-request.controller';
import { PropertyRequestService } from './property-request.service';

@Module({
  imports: [DatabaseModule, PropertyModule, RoomRequestModule],
  controllers: [PropertyRequestController],
  providers: [PropertyRequestService],
  exports: [PropertyRequestService],
})
export class PropertyRequestModule {}
