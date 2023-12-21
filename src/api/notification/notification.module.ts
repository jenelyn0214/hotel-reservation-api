import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import pusherConfig from '@src/config/pusher.config';
import { DatabaseModule } from '@src/database/database.module';

import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [DatabaseModule, ConfigModule.forFeature(pusherConfig)],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
