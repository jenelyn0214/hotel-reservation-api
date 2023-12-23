import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { IRoomType } from '@src/interfaces';

export class RoomTypeDTO implements IRoomType {
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

  @ApiProperty()
  @IsNumber()
  maxPax: number;
}

export class RoomTypeRequestDTO extends OmitType(RoomTypeDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRoomTypeDTO extends RoomTypeRequestDTO {}

export class UpdateRoomTypeDTO extends PartialType(RoomTypeRequestDTO) {}

export class FilterRoomTypeDTO extends PartialType(
  OmitType(RoomTypeDTO, ['id', 'created', 'updated', 'deleted'] as const),
) {}
