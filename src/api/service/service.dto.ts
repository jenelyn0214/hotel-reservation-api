import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { ServiceTypeEnum } from '@src/enums';
import { IService } from '@src/interfaces';

export class ServiceDTO implements IService {
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
  name: string;

  @ApiProperty({
    enum: ServiceTypeEnum,
  })
  @IsEnum(ServiceTypeEnum)
  type: ServiceTypeEnum;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class ServiceRequestDTO extends OmitType(ServiceDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateServiceDTO extends ServiceRequestDTO {}

export class UpdateServiceDTO extends PartialType(ServiceRequestDTO) {}

export class FilterServiceDTO extends PartialType(
  OmitType(ServiceDTO, [
    'id',
    'type',
    'created',
    'updated',
    'deleted',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: ServiceTypeEnum, type: ServiceTypeEnum })
  @IsOptional()
  @ApiPropertyOptional()
  type?: ServiceTypeEnum[];
}
