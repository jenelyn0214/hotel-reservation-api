import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PropertyServiceMemberStatusEnum } from '@src/enums';
import { IPropertyServiceMember } from '@src/interfaces';

import { PropertyDTO } from '../property/property.dto';

export class PropertyServiceMemberDTO implements IPropertyServiceMember {
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
  contactNo: string;

  @ApiProperty({
    enum: PropertyServiceMemberStatusEnum,
  })
  @IsEnum(PropertyServiceMemberStatusEnum)
  status: PropertyServiceMemberStatusEnum;

  @ApiProperty()
  @IsString()
  propertyId: string;

  @ApiProperty({ type: PropertyDTO })
  @IsOptional()
  @ApiPropertyOptional()
  property?: PropertyDTO;
}

export class PropertyServiceMemberRequestDTO extends OmitType(
  PropertyServiceMemberDTO,
  ['id', 'created', 'updated', 'deleted'] as const,
) {}

export class CreatePropertyServiceMemberDTO extends PropertyServiceMemberRequestDTO {}

export class UpdatePropertyServiceMemberDTO extends PartialType(
  PropertyServiceMemberRequestDTO,
) {}

export class FilterPropertyServiceMemberDTO extends PartialType(
  OmitType(PropertyServiceMemberDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'property',
  ] as const),
) {}
