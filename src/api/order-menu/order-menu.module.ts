import { Module } from '@nestjs/common';

import { RoomModule } from '@src/api/room/room.module';
import { DatabaseModule } from '@src/database/database.module';

import { OrderMenuController } from './order-menu.controller';
import { OrderMenuService } from './order-menu.service';

@Module({
  imports: [DatabaseModule, RoomModule],
  controllers: [OrderMenuController],
  providers: [OrderMenuService],
  exports: [OrderMenuService],
})
export class OrderMenuModule {}
