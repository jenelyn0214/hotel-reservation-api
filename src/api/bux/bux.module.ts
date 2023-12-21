import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import buxConfig from '@src/config/bux.config';
import commonConfig from '@src/config/common.config';

import { BUXController } from './bux.controller';
import { BUXService } from './bux.service';

@Module({
  imports: [
    ConfigModule.forFeature(buxConfig),
    ConfigModule.forFeature(commonConfig),
  ],
  controllers: [BUXController],
  providers: [BUXService],
})
export class BUXModule {}
