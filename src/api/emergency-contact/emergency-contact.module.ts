import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { EmergencyContactController } from './emergency-contact.controller';
import { EmergencyContactService } from './emergency-contact.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmergencyContactController],
  providers: [EmergencyContactService],
  exports: [EmergencyContactService],
})
export class EmergencyContactModule {}
