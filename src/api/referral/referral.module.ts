import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';

import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { ReferralController } from './referral.controller';
import { ReferralService } from './referral.service';

@Module({
  imports: [DatabaseModule, UserModule, forwardRef(() => WalletModule)],
  controllers: [ReferralController],
  providers: [ReferralService],
  exports: [ReferralService],
})
export class ReferralModule {}
