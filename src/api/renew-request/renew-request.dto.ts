import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

import { PropertyManagementItemDTO } from '@src/api/property-management/property-management.dto';
import { RentDTO } from '@src/api/rent/rent.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IRenewRequest } from '@src/interfaces';

export class RenewRequestDTO implements IRenewRequest {
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
  rentId: string;

  @ApiProperty()
  @IsString()
  minimumStayId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  minimumStay?: PropertyManagementItemDTO | null;

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

  @ApiProperty({ type: RentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  rent?: RentDTO;
}

export class RenewRequestRequestDTO extends OmitType(RenewRequestDTO, [
  'id',
  'user',
  'rent',
  'minimumStay',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRenewRequestDTO extends RenewRequestRequestDTO {}

export class UpdateRenewRequestDTO extends PartialType(
  RenewRequestRequestDTO,
) {}

export class FilterRenewRequestDTO extends PartialType(
  OmitType(RenewRequestDTO, [
    'id',
    'user',
    'rent',
    'minimumStay',
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
