import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { HallController } from './hall.controller';
import { HallService } from './hall.service';

@Module({
  imports: [DatabaseModule],
  controllers: [HallController],
  providers: [HallService],
  exports: [HallService],
})
export class HallModule {}
