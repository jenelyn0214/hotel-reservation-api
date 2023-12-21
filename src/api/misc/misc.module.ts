import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharpModule } from 'nestjs-sharp';

import cloudinaryConfig from '@src/config/cloudinary.config';

import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';

@Module({
  imports: [ConfigModule.forFeature(cloudinaryConfig), SharpModule],
  controllers: [MiscController],
  providers: [MiscService],
})
export class MiscModule {}
