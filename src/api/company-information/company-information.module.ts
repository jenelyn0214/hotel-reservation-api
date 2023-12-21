import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { CompanyInformationController } from './company-information.controller';
import { CompanyInformationService } from './company-information.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyInformationController],
  providers: [CompanyInformationService],
  exports: [CompanyInformationService],
})
export class CompanyInformationModule {}
