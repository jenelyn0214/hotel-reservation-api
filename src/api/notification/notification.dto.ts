import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { NotificationTypeEnum, UserIDTypeEnum } from '@src/enums';
import { INotification } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class NotificationDTO implements INotification {
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
  @IsString()
  fromUserId?: string | null;

  @ApiProperty()
  @IsString()
  toUserId: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'read'))
  @IsBoolean()
  read?: boolean;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'isSystem'))
  @IsBoolean()
  isSystem?: boolean;

  @ApiProperty({
    enum: UserIDTypeEnum,
    nullable: true,
    default: null,
  })
  @IsOptional()
  @IsEnum(UserIDTypeEnum)
  category: UserIDTypeEnum | null;

  @ApiProperty({
    enum: NotificationTypeEnum,
  })
  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  fromUser?: UserDTO;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  toUser?: UserDTO;
}

export class NotificationRequestDTO extends OmitType(NotificationDTO, [
  'id',
  'fromUser',
  'toUser',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateNotificationDTO extends NotificationRequestDTO {}

export class UpdateNotificationDTO extends PartialType(
  NotificationRequestDTO,
) {}

export class FilterNotificationDTO extends PartialType(
  OmitType(NotificationDTO, [
    'id',
    'fromUser',
    'toUser',
    'created',
    'updated',
    'deleted',
    'category',
    'type',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: UserIDTypeEnum,
    type: UserIDTypeEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  category?: UserIDTypeEnum[];

  @ApiProperty({
    isArray: true,
    enum: NotificationTypeEnum,
    type: NotificationTypeEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  type?: NotificationTypeEnum[];
}
