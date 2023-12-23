import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { QueueStatusEnum } from '@src/enums';
import { IQueue } from '@src/interfaces';

export class QueueDTO implements IQueue {
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

  @ApiProperty({
    enum: QueueStatusEnum,
  })
  @IsEnum(QueueStatusEnum)
  status: QueueStatusEnum;
}

export class QueueRequestDTO extends OmitType(QueueDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateQueueDTO extends QueueRequestDTO {}

export class UpdateQueueDTO extends PartialType(QueueRequestDTO) {}

export class FilterQueueDTO extends PartialType(
  OmitType(QueueDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'status',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: QueueStatusEnum, type: QueueStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: QueueStatusEnum[];
}
