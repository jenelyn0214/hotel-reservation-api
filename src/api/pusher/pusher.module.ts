import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '@src/api/user/user.module';
import pusherConfig from '@src/config/pusher.config';

import { PusherController } from './pusher.controller';
import { PusherService } from './pusher.service';

@Module({
  imports: [ConfigModule.forFeature(pusherConfig), UserModule],
  controllers: [PusherController],
  providers: [PusherService],
})
export class PusherModule {}
