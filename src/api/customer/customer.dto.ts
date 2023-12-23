import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { GenderEnum } from '@src/enums';
import { ICustomer } from '@src/interfaces';

export class CustomerDTO implements ICustomer {
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
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string | null;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  middleName?: string | null;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({
    enum: GenderEnum,
  })
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}

export class CustomerRequestDTO extends OmitType(CustomerDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateCustomerDTO extends CustomerRequestDTO {}

export class UpdateCustomerDTO extends PartialType(CustomerRequestDTO) {}

export class FilterCustomerDTO extends PartialType(
  OmitType(CustomerDTO, ['id', 'created', 'updated', 'deleted'] as const),
) {}
