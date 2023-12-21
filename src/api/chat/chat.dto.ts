import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { IChat, IChatItem } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class ChatItemDTO implements IChatItem {
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
  fromUserId: string;

  @ApiProperty()
  @IsString()
  toUserId: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'read'))
  @IsBoolean()
  @ApiPropertyOptional()
  read?: boolean;

  //For file uploading
  @ApiProperty()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  attachment?: string;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  fromUser?: UserDTO;

  @ApiProperty({ type: UserDTO })
  toUser?: UserDTO;
}

export class ChatItemRequestDTO extends OmitType(ChatItemDTO, [
  'id',
  'fromUser',
  'toUser',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateChatItemDTO extends ChatItemRequestDTO {}

export class UpdateChatItemDTO extends PartialType(ChatItemRequestDTO) {}

export class ChatDTO implements IChat {
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

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  userIds: string[];

  @ApiProperty({ isArray: true, type: ChatItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  chats?: ChatItemDTO[];

  @ApiProperty({ isArray: true, type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  users?: UserDTO[];
}

export class ChatRequestDTO extends OmitType(ChatDTO, [
  'id',
  'users',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateChatDTO extends ChatRequestDTO {}

export class UpdateChatDTO extends PartialType(ChatRequestDTO) {}

export class FilterChatDTO extends PartialType(
  OmitType(ChatDTO, [
    'id',
    'users',
    'created',
    'updated',
    'deleted',
    'chats',
  ] as const),
) {}
