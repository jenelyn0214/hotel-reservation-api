import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { DemoStatusEnum } from '@src/enums';
import { IDemo } from '@src/interfaces';

export class DemoDTO implements IDemo {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;

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
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  datetime: Date;

  @ApiProperty({
    enum: DemoStatusEnum,
  })
  @IsEnum(DemoStatusEnum)
  status: DemoStatusEnum;
}

export class DemoRequestDTO extends OmitType(DemoDTO, [
  'id',
  'created',
  'updated',
  'deleted',
  'fullName',
] as const) {}

export class CreateDemoDTO extends DemoRequestDTO {}

export class UpdateDemoDTO extends PartialType(DemoRequestDTO) {}

export class FilterDemoDTO extends PartialType(
  OmitType(DemoDTO, ['id', 'created', 'updated', 'deleted', 'status'] as const),
) {
  @ApiProperty({ isArray: true, enum: DemoStatusEnum, type: DemoStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: DemoStatusEnum[];
}
