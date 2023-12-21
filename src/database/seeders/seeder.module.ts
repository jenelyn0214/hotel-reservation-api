import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '@src/api/user/user.module';

import { Seeder } from './seeder';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [],
  providers: [Seeder],
})
export class SeederModule {}
