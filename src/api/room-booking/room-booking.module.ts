import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { RoomBookingController } from './room-booking.controller';
import { RoomBookingService } from './room-booking.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomBookingController],
  providers: [RoomBookingService],
  exports: [RoomBookingService],
})
export class RoomBookingModule {}
