import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule {}
