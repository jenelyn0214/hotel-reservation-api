import { Module } from '@nestjs/common';

import { RoomModule } from '@src/api/room/room.module';
import { DatabaseModule } from '@src/database/database.module';

import { BookingServiceController } from './booking-service.controller';
import { BookingServiceService } from './booking-service.service';

@Module({
  imports: [DatabaseModule, RoomModule],
  controllers: [BookingServiceController],
  providers: [BookingServiceService],
  exports: [BookingServiceService],
})
export class BookingServiceModule {}
