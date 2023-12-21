import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { ReferralStatusEnum } from '@src/enums';
import {
  IRefereeReferrerReward,
  IReferral,
  IReferralReward,
  IReferralUser,
  ISuccessfulRentReward,
} from '@src/interfaces';

export class ReferralUserDTO implements IReferralUser {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  rewardPoints: number;

  @ApiProperty({
    enum: ReferralStatusEnum,
  })
  @IsEnum(ReferralStatusEnum)
  status: ReferralStatusEnum;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  created?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  updated?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  deleted?: Date;
}

export class ReferralUserRequestDTO extends OmitType(ReferralUserDTO, [
  'id',
  'user',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateReferralUserDTO extends OmitType(ReferralUserRequestDTO, [
  'rewardPoints',
] as const) {}

export class UpdateReferralUserDTO extends PartialType(
  OmitType(ReferralUserRequestDTO, ['userId'] as const),
) {}

export class RefereeReferrerRewardDTO implements IRefereeReferrerReward {
  @ApiProperty()
  @IsNumber()
  referee: number;

  @ApiProperty()
  @IsNumber()
  referrer: number;
}

export class SuccessfulRentRewardDTO implements ISuccessfulRentReward {
  @ApiProperty()
  @IsString()
  amountPercentage: string;
}

export class ReferralRewardsDTO implements IReferralReward {
  @ApiProperty()
  @IsObject()
  registration: RefereeReferrerRewardDTO;
  @ApiProperty()
  @IsObject()
  successful_rent: SuccessfulRentRewardDTO;
}

export class ReferralDTO implements IReferral {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  totalRewardPoints: number;

  @ApiProperty()
  @IsString()
  referralCode: string;

  @ApiProperty()
  @IsNumber()
  referralCodePoints: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  referredByUserId?: string;

  @ApiProperty({ isArray: true, type: ReferralUserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  referrals?: ReferralUserDTO[];

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  referredBy?: UserDTO;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  created?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  updated?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  deleted?: Date;
}

export class ReferralRequestDTO extends OmitType(ReferralDTO, [
  'id',
  'user',
  'referredBy',
  'referrals',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateReferralDTO extends OmitType(ReferralRequestDTO, [
  'totalRewardPoints',
  'referralCodePoints',
  'referralCode',
]) {}

export class AddReferralRewardsDTO extends PartialType(
  OmitType(ReferralDTO, [
    'id',
    'userId',
    'totalRewardPoints',
    'referralCode',
    'referredByUserId',
    'referredBy',
    'referralCodePoints',
    'referrals',
    'user',
    'created',
    'updated',
    'deleted',
  ] as const),
) {
  @ApiProperty()
  @IsNumber()
  points: number;

  @ApiProperty()
  @IsString()
  description: string;
}

export class UpdateReferralDTO extends PartialType(
  OmitType(ReferralRequestDTO, ['referralCodePoints', 'totalRewardPoints']),
) {}

export class FilterReferralDTO extends PartialType(
  OmitType(ReferralDTO, [
    'id',
    'user',
    'referredBy',
    'created',
    'updated',
    'deleted',
    'referrals',
  ] as const),
) {}
