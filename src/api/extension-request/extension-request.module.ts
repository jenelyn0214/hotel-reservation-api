import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { ExtensionRequestController } from './extension-request.controller';
import { ExtensionRequestService } from './extension-request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExtensionRequestController],
  providers: [ExtensionRequestService],
  exports: [ExtensionRequestService],
})
export class ExtensionRequestModule {}
