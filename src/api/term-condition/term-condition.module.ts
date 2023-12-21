import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { TermConditionController } from './term-condition.controller';
import { TermConditionService } from './term-condition.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TermConditionController],
  providers: [TermConditionService],
  exports: [TermConditionService],
})
export class TermConditionModule {}
