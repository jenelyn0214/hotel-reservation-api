import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IContactUs } from '@src/interfaces';

export class ContactUsDTO implements IContactUs {
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
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  message: string;
}

export class ContactUsRequestDTO extends OmitType(ContactUsDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateContactUsDTO extends ContactUsRequestDTO {}

export class UpdateContactUsDTO extends PartialType(ContactUsRequestDTO) {}

export class FilterContactUsDTO extends PartialType(ContactUsRequestDTO) {}
