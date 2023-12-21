import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { CancelContractRequestController } from './cancel-contract-request.controller';
import { CancelContractRequestService } from './cancel-contract-request.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CancelContractRequestController],
  providers: [CancelContractRequestService],
  exports: [CancelContractRequestService],
})
export class CancelContractRequestModule {}
