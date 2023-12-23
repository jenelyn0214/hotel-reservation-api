import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { HallBookingController } from './hall-booking.controller';
import { HallBookingService } from './hall-booking.service';

@Module({
  imports: [DatabaseModule],
  controllers: [HallBookingController],
  providers: [HallBookingService],
  exports: [HallBookingService],
})
export class HallBookingModule {}
