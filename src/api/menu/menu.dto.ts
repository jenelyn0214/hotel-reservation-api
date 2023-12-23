import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { MenuStatusEnum } from '@src/enums';
import { IMenu } from '@src/interfaces';

export class MenuDTO implements IMenu {
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
  @IsNumber()
  price: number;

  @ApiProperty({
    enum: MenuStatusEnum,
  })
  @IsEnum(MenuStatusEnum)
  status: MenuStatusEnum;
}

export class MenuRequestDTO extends OmitType(MenuDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateMenuDTO extends MenuRequestDTO {}

export class UpdateMenuDTO extends PartialType(MenuRequestDTO) {}

export class FilterMenuDTO extends PartialType(
  OmitType(MenuDTO, ['id', 'created', 'updated', 'deleted', 'status'] as const),
) {
  @ApiProperty({ isArray: true, enum: MenuStatusEnum, type: MenuStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: MenuStatusEnum[];
}
