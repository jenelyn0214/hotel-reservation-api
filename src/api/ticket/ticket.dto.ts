import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { RoomDTO } from '@src/api/room/room.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { TicketStatusEnum, TicketTypeEnum } from '@src/enums';
import { ITicket, ITicketComment } from '@src/interfaces';

export class TicketCommentDTO implements ITicketComment {
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
  comment: string;

  //For file upload
  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  attachment?: string[];

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;
}

export class TicketCommentRequestDTO extends OmitType(TicketCommentDTO, [
  'id',
  'user',
  'room',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateTicketCommentDTO extends TicketCommentRequestDTO {}

export class UpdateTicketCommentDTO extends PartialType(
  TicketCommentRequestDTO,
) {}

export class TicketDTO implements ITicket {
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
  @IsOptional()
  @ApiPropertyOptional()
  closed?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  TID?: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({
    enum: TicketTypeEnum,
  })
  @IsEnum(TicketTypeEnum)
  type: TicketTypeEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  roomId?: string | null;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  priority: string;

  @ApiProperty()
  @IsString()
  concern: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  attachments?: string[];

  @ApiProperty({
    enum: TicketStatusEnum,
  })
  @IsEnum(TicketStatusEnum)
  status: TicketStatusEnum;

  @ApiProperty({ isArray: true, type: TicketCommentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  comments?: TicketCommentDTO[];

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;
}

export class TicketRequestDTO extends OmitType(TicketDTO, [
  'id',
  'TID',
  'user',
  'room',
  'comments',
  'closed',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateTicketDTO extends TicketRequestDTO {}

export class UpdateTicketDTO extends PartialType(TicketRequestDTO) {}

export class FilterTicketDTO extends PartialType(
  OmitType(TicketDTO, [
    'id',
    'user',
    'room',
    'created',
    'updated',
    'deleted',
    'attachments',
    'comments',
  ] as const),
) {}
