import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { UserPermissionController } from './user-permission.controller';
import { UserPermissionService } from './user-permission.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
  exports: [UserPermissionService],
})
export class UserPermissionModule {}
