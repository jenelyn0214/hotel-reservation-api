import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Model, model } from 'mongoose';

import { referralRewardPoints } from '@src/constants';
import { DatabaseService } from '@src/database/database.service';
import { ReferralStatusEnum } from '@src/enums';
import { IReferral, IReferralLogs, IReferralReward } from '@src/interfaces';
import { IReferralDoc, ReferralSchema } from '@src/schema/referral.schema';
import { toPlainObject } from '@src/util/dto-util';
import { generateReferralCode } from '@src/util/id-generator';

import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import {
  AddReferralRewardsDTO,
  CreateReferralDTO,
  CreateReferralUserDTO,
  FilterReferralDTO,
  ReferralDTO,
  ReferralUserDTO,
  UpdateReferralDTO,
  UpdateReferralUserDTO,
} from './referral.dto';

@Injectable()
export class ReferralService {
  private serviceModel: typeof Model;

  constructor(
    private readonly dbService: DatabaseService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.Referral ||
      model<IReferralDoc>('Referral', ReferralSchema);
  }

  async create(createReferralDTO: CreateReferralDTO): Promise<ReferralDTO> {
    const referralResult = await this.serviceModel
      .findOne({
        deleted: null,
        userId: createReferralDTO.userId,
      })
      .exec();

    if (!referralResult) {
      let referralCode = generateReferralCode();
      let searching = true;

      while (searching) {
        const result = await this.findByFilter({
          referralCode,
        });

        if (!result.length) {
          searching = false;
        } else {
          referralCode = generateReferralCode();
        }
      }

      const referralData: IReferral = {
        ...createReferralDTO,
        totalRewardPoints: 0,
        referralCodePoints: 0,
        referralCode,
      };

      const referral = await this.serviceModel.create(referralData);

      return referral.toJSON() as ReferralDTO;
    } else {
      return referralResult.toJSON() as ReferralDTO;
    }
  }

  async findAll(): Promise<ReferralDTO[]> {
    const referralsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const referrals = referralsResult.map((u) => u.toJSON() as ReferralDTO);

    const referralData = referrals.map((item) => {
      const referralUsers = item.referrals.filter(
        (referralUser) => !referralUser.deleted,
      );

      return {
        ...item,
        referrals: referralUsers,
      };
    });

    return referralData;
  }

  async findByFilter(
    filterReferralDTO: FilterReferralDTO,
  ): Promise<ReferralDTO[]> {
    const referralsResult = await this.serviceModel
      .find({ ...filterReferralDTO, deleted: null })
      .exec();

    const referrals = referralsResult.map((u) => u.toJSON() as ReferralDTO);

    const referralData = referrals.map((item) => {
      const referralUsers = item.referrals.filter(
        (referralUser) => !referralUser.deleted,
      );

      return {
        ...item,
        referrals: referralUsers,
      };
    });

    return referralData;
  }

  async findOne(id: string): Promise<ReferralDTO> {
    const referralResult = await this.serviceModel.findOne({ _id: id }).exec();

    const referral = toPlainObject<ReferralDTO>(referralResult);

    const referralUsers = referral.referrals.filter(
      (referralUser) => !referralUser.deleted,
    );

    const referralData: ReferralDTO = {
      ...referral,
      referrals: referralUsers,
    };

    return referralData;
  }

  async update(
    id: string,
    updateReferralDTO: UpdateReferralDTO,
  ): Promise<ReferralDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateReferralDTO,
          updated: Date.now(),
        },
      )
      .exec();

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

  async createReferralUser(
    id: string,
    createReferralUserDTO: CreateReferralUserDTO,
  ): Promise<ReferralUserDTO[]> {
    const referralResult = await this.findOne(id);
    const userReferral = referralResult.referrals.find(
      (userReferral) => userReferral.userId === createReferralUserDTO.userId,
    );

    const rewardPoints = referralRewardPoints.registration.referee;

    if (userReferral) return referralResult.referrals;

    const updateForm: Pick<IReferral, 'referralCodePoints'> = {
      referralCodePoints:
        createReferralUserDTO?.status === ReferralStatusEnum.DONE
          ? rewardPoints
          : 0,
    };

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $inc: updateForm,
          $addToSet: {
            referrals: {
              ...createReferralUserDTO,
              rewardPoints,
            },
          },
        },
      )
      .exec();

    const referralData = await this.findOne(id);

    return referralData.referrals;
  }

  async updateReferralUser(
    id: string,
    itemId: string,
    updateReferralUserDTO: UpdateReferralUserDTO,
  ): Promise<ReferralUserDTO[]> {
    const referralResult = await this.findOne(id);
    const userReferral = referralResult.referrals.find(
      (userReferral) => userReferral.id === itemId,
    );

    const updateForm: Pick<IReferral, 'referralCodePoints'> = {
      referralCodePoints: userReferral.rewardPoints,
    };

    const updateResult = await this.serviceModel
      .updateOne(
        {
          _id: id,
          referrals: {
            $elemMatch: {
              _id: itemId,
              status: ReferralStatusEnum.PENDING,
            },
          },
        },

        {
          $inc: updateForm,
          $set: {
            'referrals.$[item].status': updateReferralUserDTO.status,
            'referrals.$[item].updated': Date.now(),
          },
        },

        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const referralData = await this.findOne(id);

    if (
      updateResult &&
      updateResult.matchedCount > 0 &&
      updateResult.modifiedCount > 0
    ) {
      return referralData.referrals;
    } else {
      throw new HttpException(
        `Referral user status is already ${ReferralStatusEnum.DONE}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async deleteReferralUser(
    id: string,
    itemId: string,
  ): Promise<ReferralUserDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'referrals.$[item].deleted': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const referralData = await this.findOne(id);

    return referralData.referrals;
  }

  async getRewardPoints(): Promise<IReferralReward> {
    return referralRewardPoints;
  }

  async addRewards(id: string, addReferralRewardsDTO: AddReferralRewardsDTO) {
    const userReferralAccount = await this.findOne(id);

    const updateReferralForm: Pick<IReferral, 'totalRewardPoints'> = {
      totalRewardPoints: addReferralRewardsDTO.points,
    };

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $inc: updateReferralForm,
          updated: Date.now(),
        },
      )
      .exec();

    await this.createLogs(userReferralAccount.id, {
      points: addReferralRewardsDTO.points,
      description: addReferralRewardsDTO.description,
    });

    const updatedReferralAccount = await this.findOne(id);

    return updatedReferralAccount;
  }

  async getReferralAccountByUserId(
    userId: string,
  ): Promise<ReferralDTO | null> {
    const referralResults = await this.findByFilter({ userId });

    if (!referralResults.length) return null;

    return referralResults[0];
  }

  async createLogs(id: string, data: IReferralLogs) {
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
