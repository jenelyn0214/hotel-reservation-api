import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { BusinessDTO } from '@src/api/business/business.dto';
import { ServiceDTO } from '@src/api/service/service.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IServiceRequest } from '@src/interfaces';

export class ServiceRequestsDTO implements IServiceRequest {
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

  @ApiProperty()
  @IsString()
  serviceId: string;

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

  @ApiProperty({ type: ServiceDTO })
  @IsOptional()
  @ApiPropertyOptional()
  service?: ServiceDTO;
}

export class ServiceRequestRequestDTO extends OmitType(ServiceRequestsDTO, [
  'id',
  'user',
  'business',
  'service',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateServiceRequestDTO extends ServiceRequestRequestDTO {}

export class UpdateServiceRequestDTO extends PartialType(
  ServiceRequestRequestDTO,
) {}

export class FilterServiceRequestDTO extends PartialType(
  OmitType(ServiceRequestsDTO, [
    'id',
    'user',
    'business',
    'service',
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
