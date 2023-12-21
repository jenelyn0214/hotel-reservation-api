import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { ReferralModule } from '../referral/referral.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => ReferralModule)],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
