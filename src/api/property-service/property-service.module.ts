import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { PropertyServiceController } from './property-service.controller';
import { PropertyServiceService } from './property-service.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PropertyServiceController],
  providers: [PropertyServiceService],
  exports: [PropertyServiceService],
})
export class PropertyServiceModule {}
