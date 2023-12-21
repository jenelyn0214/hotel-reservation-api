import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { PropertyServiceMemberController } from './property-service-member.controller';
import { PropertyServiceMemberService } from './property-service-member.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PropertyServiceMemberController],
  providers: [PropertyServiceMemberService],
  exports: [PropertyServiceMemberService],
})
export class PropertyServiceMemberModule {}
