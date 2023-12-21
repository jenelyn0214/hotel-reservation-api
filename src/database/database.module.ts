import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import dbConfig from '@src/config/database.config';

import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigModule.forFeature(dbConfig)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
