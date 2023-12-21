import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum, UserIDTypeEnum } from '@src/enums';
import { IUserRequest } from '@src/interfaces';

export class UserRequestsDTO implements IUserRequest {
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
    enum: UserIDTypeEnum,
  })
  @IsEnum(UserIDTypeEnum)
  userType: UserIDTypeEnum;

  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;

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

export class UserRequestRequestDTO extends OmitType(UserRequestsDTO, [
  'id',
  'user',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateUserRequestDTO extends UserRequestRequestDTO {}

export class UpdateUserRequestDTO extends PartialType(UserRequestRequestDTO) {}

export class FilterUserRequestDTO extends PartialType(
  OmitType(UserRequestsDTO, [
    'id',
    'user',
    'created',
    'updated',
    'deleted',
    'status',
    'userType',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: StatusEnum, type: StatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusEnum[];

  @ApiProperty({ isArray: true, enum: UserIDTypeEnum, type: UserIDTypeEnum })
  @IsOptional()
  @ApiPropertyOptional()
  userType?: UserIDTypeEnum[];
}
