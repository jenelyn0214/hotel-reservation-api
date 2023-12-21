import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { RentDTO } from '@src/api/rent/rent.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { RefundStatusEnum, StatusDescEnum } from '@src/enums';
import { IRefundRequest, IRefundRequestLogs } from '@src/interfaces';

export class RefundRequestLogsDTO implements IRefundRequestLogs {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  created?: Date;

  @ApiProperty({
    enum: RefundStatusEnum,
  })
  @IsEnum(RefundStatusEnum)
  status: RefundStatusEnum;

  @ApiProperty({
    enum: StatusDescEnum,
  })
  @IsEnum(StatusDescEnum)
  statusDesc: StatusDescEnum;

  @ApiProperty()
  @IsString()
  log: string;
}

export class RefundRequestDTO implements IRefundRequest {
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
  reason: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({
    enum: RefundStatusEnum,
  })
  @IsEnum(RefundStatusEnum)
  status: RefundStatusEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  rejectReason?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  adminRejectReason?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  bankName?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  accountName?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  accountNumber?: string | null;

  @ApiProperty({ isArray: true, type: RefundRequestLogsDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  logs?: RefundRequestLogsDTO[];

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: RentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  rent?: RentDTO;
}

export class RefundRequestRequestDTO extends OmitType(RefundRequestDTO, [
  'id',
  'user',
  'rent',
  'logs',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRefundRequestDTO extends RefundRequestRequestDTO {}

export class UpdateRefundRequestDTO extends PartialType(
  RefundRequestRequestDTO,
) {}

export class FilterRefundRequestDTO extends PartialType(
  OmitType(RefundRequestDTO, [
    'id',
    'user',
    'rent',
    'logs',
    'created',
    'updated',
    'deleted',
    'status',
    'images',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: RefundStatusEnum,
    type: RefundStatusEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: RefundStatusEnum[];
}
