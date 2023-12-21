import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserIDTypeEnum } from '@src/enums';
import { IUser } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

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
  @IsOptional()
  @ApiPropertyOptional()
  login?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iblNumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iRNumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iSNumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iMNumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iMRNumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iENumber?: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  iPNumber?: string | null;

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
  password: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  category?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  photoPath?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  placeIssued?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  dateIssued: Date | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  validIDNo?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  IDPath?: string;

  @ApiProperty({
    enum: UserIDTypeEnum,
  })
  @IsEnum(UserIDTypeEnum)
  type: UserIDTypeEnum;

  @ApiProperty({
    enum: UserIDTypeEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(UserIDTypeEnum)
  additionalType?: UserIDTypeEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  propertyId?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  userId?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'active'))
  @IsBoolean()
  active?: boolean | true;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'confirmed'))
  @IsBoolean()
  confirmed?: boolean | false;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'invoiceNotif'))
  @IsBoolean()
  invoiceNotif?: boolean | false;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'ticketNotif'))
  @IsBoolean()
  ticketNotif?: boolean | false;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'propertyNotif'))
  @IsBoolean()
  propertyNotif?: boolean | false;
}

export class UserRequestDTO extends OmitType(UserDTO, [
  'id',
  'created',
  'updated',
  'deleted',
  'iblNumber',
  'iRNumber',
  'iSNumber',
  'iMNumber',
  'iMRNumber',
  'iENumber',
  'iPNumber',
  'fullName',
  'login',
] as const) {}

export class CreateUserDTO extends UserRequestDTO {}

export class UpdateUserDTO extends PartialType(UserRequestDTO) {}

export class FilterUserDTO extends PartialType(
  OmitType(UserDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'login',
    'refreshToken',
    'password',
    'category',
    'photoPath',
    'IDPath',
    'type',
    'additionalType',
  ] as const),
) {
  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  category?: string[];

  @ApiProperty({ isArray: true, enum: UserIDTypeEnum, type: UserIDTypeEnum })
  @IsOptional()
  @ApiPropertyOptional()
  type?: UserIDTypeEnum[];

  @ApiProperty({ isArray: true, enum: UserIDTypeEnum, type: UserIDTypeEnum })
  @IsOptional()
  @ApiPropertyOptional()
  additionalType?: UserIDTypeEnum[];

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
