import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
  exports: [RoomTypeService],
})
export class RoomTypeModule {}
