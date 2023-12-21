import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { RoomDTO } from '@src/api/room/room.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { ICheckInRequest } from '@src/interfaces';

import { RentDTO } from '../rent/rent.dto';

export class CheckInRequestDTO implements ICheckInRequest {
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
  roomId: string;

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

  @ApiProperty({ type: RentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  rent?: RentDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;
}

export class CheckInRequestRequestDTO extends OmitType(CheckInRequestDTO, [
  'id',
  'user',
  'room',
  'rent',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateCheckInRequestDTO extends CheckInRequestRequestDTO {}

export class UpdateCheckInRequestDTO extends PartialType(
  CheckInRequestRequestDTO,
) {}

export class FilterCheckInRequestDTO extends PartialType(
  OmitType(CheckInRequestDTO, [
    'id',
    'user',
    'room',
    'rent',
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
