import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ITermCondition } from '@src/interfaces';

export class TermConditionDTO implements ITermCondition {
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
  propertyId?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  businessId?: string | null;

  @ApiProperty()
  @IsString()
  rules: string;

  @ApiProperty()
  @IsString()
  safety: string;

  @ApiProperty()
  @IsString()
  cancellation: string;
}

export class TermConditionRequestDTO extends OmitType(TermConditionDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateTermConditionDTO extends TermConditionRequestDTO {}

export class UpdateTermConditionDTO extends PartialType(
  TermConditionRequestDTO,
) {}

export class FilterTermConditionDTO extends PartialType(
  TermConditionRequestDTO,
) {}
