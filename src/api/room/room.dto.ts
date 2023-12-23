import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { RoomStatusEnum } from '@src/enums';
import { IRoom } from '@src/interfaces';

import { RoomTypeDTO } from '../room-type/room-type.dto';

export class RoomDTO implements IRoom {
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
  number: string;

  @ApiProperty()
  @IsString()
  roomTypeId: string;

  @ApiProperty({ type: RoomTypeDTO })
  @IsOptional()
  @ApiPropertyOptional()
  roomType?: RoomTypeDTO;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  maxPax: number;

  @ApiProperty({
    enum: RoomStatusEnum,
  })
  @IsEnum(RoomStatusEnum)
  status: RoomStatusEnum;
}

export class RoomRequestDTO extends OmitType(RoomDTO, [
  'id',
  'created',
  'updated',
  'deleted',
  'roomType',
] as const) {}

export class CreateRoomDTO extends RoomRequestDTO {}

export class UpdateRoomDTO extends PartialType(RoomRequestDTO) {}

export class FilterRoomDTO extends PartialType(
  OmitType(RoomDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'status',
    'roomType',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: RoomStatusEnum, type: RoomStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: RoomStatusEnum[];
}
