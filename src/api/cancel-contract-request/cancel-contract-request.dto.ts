import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { RentDTO } from '@src/api/rent/rent.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { CancelContractStatusEnum, StatusDescEnum } from '@src/enums';
import {
  ICancelContractRequest,
  ICancelContractRequestLogs,
} from '@src/interfaces';

export class CancelContractRequestLogsDTO
  implements ICancelContractRequestLogs
{
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  created?: Date;

  @ApiProperty({
    enum: CancelContractStatusEnum,
  })
  @IsEnum(CancelContractStatusEnum)
  status: CancelContractStatusEnum;

  @ApiProperty({
    enum: StatusDescEnum,
  })
  @IsEnum(StatusDescEnum)
  statusDesc: StatusDescEnum;

  @ApiProperty()
  @IsString()
  log: string;
}

export class CancelContractRequestDTO implements ICancelContractRequest {
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
    enum: CancelContractStatusEnum,
  })
  @IsEnum(CancelContractStatusEnum)
  status: CancelContractStatusEnum;

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
  otherDetails?: string | null;

  @ApiProperty({ isArray: true, type: CancelContractRequestLogsDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  logs?: CancelContractRequestLogsDTO[];

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

export class CancelContractRequestRequestDTO extends OmitType(
  CancelContractRequestDTO,
  ['id', 'user', 'rent', 'logs', 'created', 'updated', 'deleted'] as const,
) {}

export class CreateCancelContractRequestDTO extends CancelContractRequestRequestDTO {}

export class UpdateCancelContractRequestDTO extends PartialType(
  CancelContractRequestRequestDTO,
) {}

export class FilterCancelContractRequestDTO extends PartialType(
  OmitType(CancelContractRequestDTO, [
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
    enum: CancelContractStatusEnum,
    type: CancelContractStatusEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: CancelContractStatusEnum[];
}
