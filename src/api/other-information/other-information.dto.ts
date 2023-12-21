import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IOtherInformation } from '@src/interfaces';

export class OtherInformationDTO implements IOtherInformation {
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
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  companyName?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  occupation?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  facebookLink?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  description?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  civilStatus?: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  citizenship?: string | null;
}

export class OtherInformationRequestDTO extends OmitType(OtherInformationDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateOtherInformationDTO extends OtherInformationRequestDTO {}

export class UpdateOtherInformationDTO extends PartialType(
  OtherInformationRequestDTO,
) {}

export class FilterOtherInformationDTO extends PartialType(
  OtherInformationRequestDTO,
) {}
