import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserTypeEnum } from '@src/enums';
import { IUser } from '@src/interfaces';

export class UserDTO implements IUser {
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
  @IsOptional()
  @ApiPropertyOptional()
  refreshToken?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string | null;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  middleName?: string | null;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({
    enum: UserTypeEnum,
  })
  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;
}

export class UserRequestDTO extends OmitType(UserDTO, [
  'id',
  'created',
  'updated',
  'deleted',
  'fullName',
] as const) {}

export class CreateUserDTO extends UserRequestDTO {}

export class UpdateUserDTO extends PartialType(UserRequestDTO) {}

export class FilterUserDTO extends PartialType(
  OmitType(UserDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'refreshToken',
    'type',
    'password',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: UserTypeEnum, type: UserTypeEnum })
  @IsOptional()
  @ApiPropertyOptional()
  type?: UserTypeEnum[];

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  createdFrom?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  createdTo?: Date;
}
