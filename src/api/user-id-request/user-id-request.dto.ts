import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IUserIDRequest } from '@src/interfaces';

export class UserIDRequestDTO implements IUserIDRequest {
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

  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty()
  @IsString()
  IDPath: string;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  dateIssued: Date;

  @ApiProperty()
  @IsString()
  placeIssued: string;

  @ApiProperty()
  @IsString()
  validIDNo: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  rejectReason?: string | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;
}

export class UserIDRequestRequestDTO extends OmitType(UserIDRequestDTO, [
  'id',
  'user',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateUserIDRequestDTO extends UserIDRequestRequestDTO {}

export class UpdateUserIDRequestDTO extends PartialType(
  UserIDRequestRequestDTO,
) {}

export class FilterUserIDRequestDTO extends PartialType(
  OmitType(UserIDRequestDTO, [
    'id',
    'user',
    'created',
    'updated',
    'deleted',
    'status',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: StatusEnum, type: StatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusEnum[];
}
