import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { OtherInformationController } from './other-information.controller';
import { OtherInformationService } from './other-information.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OtherInformationController],
  providers: [OtherInformationService],
  exports: [OtherInformationService],
})
export class OtherInformationModule {}
