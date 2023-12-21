import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { BusinessDTO } from '@src/api/business/business.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IBusinessRequest } from '@src/interfaces';

export class BusinessRequestsDTO implements IBusinessRequest {
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
  @IsString()
  businessId: string;

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

  @ApiProperty({ type: BusinessDTO })
  @IsOptional()
  @ApiPropertyOptional()
  business?: BusinessDTO;
}

export class BusinessRequestRequestDTO extends OmitType(BusinessRequestsDTO, [
  'id',
  'user',
  'business',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateBusinessRequestDTO extends BusinessRequestRequestDTO {}

export class UpdateBusinessRequestDTO extends PartialType(
  BusinessRequestRequestDTO,
) {}

export class FilterBusinessRequestDTO extends PartialType(
  OmitType(BusinessRequestsDTO, [
    'id',
    'user',
    'business',
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
