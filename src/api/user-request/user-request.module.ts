import { Module } from '@nestjs/common';

import { UserModule } from '@src/api/user/user.module';
import { DatabaseModule } from '@src/database/database.module';

import { UserRequestController } from './user-request.controller';
import { UserRequestService } from './user-request.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [UserRequestController],
  providers: [UserRequestService],
  exports: [UserRequestService],
})
export class UserRequestModule {}
