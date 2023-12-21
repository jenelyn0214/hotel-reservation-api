import { Module } from '@nestjs/common';

import { RoomModule } from '@src/api/room/room.module';
import { DatabaseModule } from '@src/database/database.module';

import { RoomRequestController } from './room-request.controller';
import { RoomRequestService } from './room-request.service';

@Module({
  imports: [DatabaseModule, RoomModule],
  controllers: [RoomRequestController],
  providers: [RoomRequestService],
  exports: [RoomRequestService],
})
export class RoomRequestModule {}
