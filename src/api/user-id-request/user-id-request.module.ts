import { Module } from '@nestjs/common';

import { UserModule } from '@src/api/user/user.module';
import { DatabaseModule } from '@src/database/database.module';

import { UserIDRequestController } from './user-id-request.controller';
import { UserIDRequestService } from './user-id-request.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [UserIDRequestController],
  providers: [UserIDRequestService],
  exports: [UserIDRequestService],
})
export class UserIDRequestModule {}
