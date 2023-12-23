import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { HallStatusEnum } from '@src/enums';
import { IHall } from '@src/interfaces';

export class HallDTO implements IHall {
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

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  maxPax: number;

  @ApiProperty({
    enum: HallStatusEnum,
  })
  @IsEnum(HallStatusEnum)
  status: HallStatusEnum;
}

export class HallRequestDTO extends OmitType(HallDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateHallDTO extends HallRequestDTO {}

export class UpdateHallDTO extends PartialType(HallRequestDTO) {}

export class FilterHallDTO extends PartialType(
  OmitType(HallDTO, ['id', 'created', 'updated', 'deleted', 'status'] as const),
) {
  @ApiProperty({ isArray: true, enum: HallStatusEnum, type: HallStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: HallStatusEnum[];
}
