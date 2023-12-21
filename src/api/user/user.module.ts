import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import commonConfig from '@src/config/common.config';
import { DatabaseModule } from '@src/database/database.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule.forFeature(commonConfig), DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
