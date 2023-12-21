import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ICompanyInformation } from '@src/interfaces';

export class CompanyInformationDTO implements ICompanyInformation {
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

  //For file uploading
  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  countryCode: string;

  @ApiProperty()
  @IsString()
  zipCode: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;
}

export class CompanyInformationRequestDTO extends OmitType(
  CompanyInformationDTO,
  ['id', 'created', 'updated', 'deleted'] as const,
) {}

export class CreateCompanyInformationDTO extends CompanyInformationRequestDTO {}

export class UpdateCompanyInformationDTO extends PartialType(
  CompanyInformationRequestDTO,
) {}
