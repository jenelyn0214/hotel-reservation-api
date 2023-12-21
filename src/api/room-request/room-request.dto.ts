import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { PropertyDTO } from '@src/api/property/property.dto';
import { RoomDTO } from '@src/api/room/room.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IRoomRequest } from '@src/interfaces';

export class RoomRequestsDTO implements IRoomRequest {
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
  propertyId: string;

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

  @ApiProperty({ type: PropertyDTO })
  @IsOptional()
  @ApiPropertyOptional()
  property?: PropertyDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;
}

export class RoomRequestsWithLogsDTO extends RoomRequestsDTO {
  @ApiProperty({ isArray: true, type: RoomRequestsDTO })
  @IsOptional()
  @IsArray()
  logs?: RoomRequestsDTO[];
}

export class RoomRequestRequestDTO extends OmitType(RoomRequestsDTO, [
  'id',
  'user',
  'room',
  'property',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRoomRequestDTO extends RoomRequestRequestDTO {}

export class UpdateRoomRequestDTO extends PartialType(RoomRequestRequestDTO) {}

export class FilterRoomRequestDTO extends PartialType(
  OmitType(RoomRequestsDTO, [
    'id',
    'user',
    'room',
    'property',
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
