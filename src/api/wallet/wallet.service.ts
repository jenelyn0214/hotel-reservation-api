import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IWallet } from '@src/interfaces';
import { IWalletDoc, WalletSchema } from '@src/schema/wallet.schema';
import { isNegative } from '@src/util/number-util';
import { toReadableFormat } from '@src/util/string-util';

import { ReferralService } from '../referral/referral.service';
import {
  CreateWalletDTO,
  FilterWalletDTO,
  UpdateWalletDTO,
  WalletDTO,
} from './wallet.dto';

@Injectable()
export class WalletService {
  private serviceModel: typeof Model;

  constructor(
    private readonly dbService: DatabaseService,
    @Inject(forwardRef(() => ReferralService))
    private readonly referralService: ReferralService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.Wallet ||
      model<IWalletDoc>('Wallet', WalletSchema);
  }

  async create(createWalletDTO: CreateWalletDTO): Promise<WalletDTO> {
    const walletResult = await this.serviceModel
      .findOne({
        deleted: null,
        userId: createWalletDTO.userId,
      })
      .exec();

    if (!walletResult) {
      const walletData: IWallet = {
        ...createWalletDTO,
        balance: 0,
      };

      const wallet = await this.serviceModel.create(walletData);

      return wallet.toJSON() as WalletDTO;
    } else {
      return walletResult.toJSON() as WalletDTO;
    }
  }

  async findAll(): Promise<WalletDTO[]> {
    const walletsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const wallets = walletsResult.map((u) => u.toJSON() as WalletDTO);

    return wallets;
  }

  async findByFilter(filterWalletDTO: FilterWalletDTO): Promise<WalletDTO[]> {
    const walletsResult = await this.serviceModel
      .find({ ...filterWalletDTO, deleted: null })
      .exec();

    const wallets = walletsResult.map((u) => u.toJSON() as WalletDTO);

    return wallets;
  }

  async findOne(id: string): Promise<WalletDTO> {
    const wallet = await this.serviceModel
      .findOne<WalletDTO>({ _id: id })
      .exec();

    return wallet;
  }

  async update(
    id: string,
    updateWalletDTO: UpdateWalletDTO,
  ): Promise<WalletDTO> {
    if (isNegative(updateWalletDTO.amount)) {
      const walletResult = await this.findOne(id);

      if (walletResult.balance < Math.abs(updateWalletDTO.amount)) {
        throw new HttpException(
          'Insufficient wallet points',
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const updateForm: Pick<IWallet, 'balance'> = {
      balance: updateWalletDTO.amount,
    };

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $inc: updateForm,
          updated: Date.now(),
        },
      )
      .exec();

    await this.createLogs(id, {
      ...updateWalletDTO,
      description: toReadableFormat(updateWalletDTO.description),
    });

    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.serviceModel
      .updateOne({ _id: id }, { deleted: Date.now() })
      .exec()
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    return result;
  }

  async getUserWallet(userId: string): Promise<WalletDTO | null> {
    const walletResults = await this.findByFilter({ userId });

    if (!walletResults.length) return null;

    return walletResults[0];
  }

  async createLogs(id: string, data: UpdateWalletDTO) {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $addToSet: {
            logs: { ...data, created: Date.now() },
          },
        },
      )
      .exec();
  }
}
