import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { IIboardtisement } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class IboardtisementDTO implements IIboardtisement {
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

  //For file uploading
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Transform(({ value }) => value && parseBoolean(value, 'active'))
  @IsBoolean()
  active: boolean | false;
}

export class IboardtisementRequestDTO extends OmitType(IboardtisementDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateIboardtisementDTO extends IboardtisementRequestDTO {}

export class UpdateIboardtisementDTO extends PartialType(
  IboardtisementRequestDTO,
) {}

export class FilterIboardtisementDTO extends PartialType(
  OmitType(IboardtisementDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'image',
  ] as const),
) {}
