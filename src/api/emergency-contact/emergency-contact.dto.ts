import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IEmergencyContact } from '@src/interfaces';

export class EmergencyContactDTO implements IEmergencyContact {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;

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
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  relationship: string;
}

export class EmergencyContactRequestDTO extends OmitType(EmergencyContactDTO, [
  'id',
  'created',
  'updated',
  'deleted',
  'fullName',
] as const) {}

export class CreateEmergencyContactDTO extends EmergencyContactRequestDTO {}

export class UpdateEmergencyContactDTO extends PartialType(
  EmergencyContactRequestDTO,
) {}

export class FilterEmergencyContactDTO extends PartialType(
  OmitType(EmergencyContactDTO, [
    'id',
    'created',
    'updated',
    'deleted',
  ] as const),
) {}
