import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
