import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { IWallet } from '@src/interfaces';

export class WalletDTO implements IWallet {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

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

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNumber()
  balance: number;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;
}

export class WalletRequestDTO extends OmitType(WalletDTO, [
  'id',
  'user',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateWalletDTO extends OmitType(WalletRequestDTO, ['balance']) {}

export class UpdateWalletDTO extends PartialType(
  OmitType(WalletDTO, [
    'id',
    'userId',
    'balance',
    'user',
    'created',
    'updated',
    'deleted',
  ] as const),
) {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class FilterWalletDTO extends PartialType(
  OmitType(WalletDTO, ['id', 'user', 'created', 'updated', 'deleted'] as const),
) {}
