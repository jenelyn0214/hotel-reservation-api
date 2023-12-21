import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PropertyDTO } from '@src/api/property/property.dto';
import { PropertyServiceStatusEnum } from '@src/enums';
import { IPropertyService, ISchedule } from '@src/interfaces';

export class PropertyServiceScheduleDTO implements ISchedule {
  @ApiProperty()
  @IsString()
  day: string;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  opening: Date;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  closing: Date;
}
export class PropertyServiceDTO implements IPropertyService {
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
  propertyId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  serviceOffered: string;

  @ApiProperty()
  @IsString()
  phoneNo: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  maxService: number;

  @ApiProperty({ isArray: true, type: PropertyServiceScheduleDTO })
  @IsArray()
  schedule: PropertyServiceScheduleDTO[];

  @ApiProperty({ type: PropertyDTO })
  @IsOptional()
  @ApiPropertyOptional()
  property?: PropertyDTO;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  status: PropertyServiceStatusEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  logoPath?: string;
}

export class PropertyServiceRequestDTO extends OmitType(PropertyServiceDTO, [
  'id',
  'property',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreatePropertyServiceDTO extends PropertyServiceRequestDTO {}

export class UpdatePropertyServiceDTO extends PartialType(
  PropertyServiceRequestDTO,
) {}

export class FilterPropertyServiceDTO extends PartialType(
  OmitType(PropertyServiceDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'property',
    'schedule',
  ] as const),
) {}
