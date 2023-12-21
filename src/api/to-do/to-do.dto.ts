import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { ToDoStatusEnum } from '@src/enums';
import { IToDo } from '@src/interfaces';

export class ToDoDTO implements IToDo {
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
  name: string;

  @ApiProperty()
  @IsString()
  details: string;

  @ApiProperty()
  @IsString()
  priority: string;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  start: Date;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  due: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  done?: Date;

  @ApiProperty({
    enum: ToDoStatusEnum,
  })
  @IsEnum(ToDoStatusEnum)
  status: ToDoStatusEnum;
}

export class ToDoRequestDTO extends OmitType(ToDoDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateToDoDTO extends ToDoRequestDTO {}

export class UpdateToDoDTO extends PartialType(ToDoRequestDTO) {}

export class FilterToDoDTO extends PartialType(
  OmitType(ToDoDTO, ['id', 'created', 'updated', 'deleted', 'status'] as const),
) {
  @ApiProperty({ isArray: true, enum: ToDoStatusEnum, type: ToDoStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: ToDoStatusEnum[];
}
