import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
