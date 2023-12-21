import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import { PropertyDTO } from '@src/api/property/property.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import { IPropertyRequest } from '@src/interfaces';

export class PropertyRequestsDTO implements IPropertyRequest {
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
  propertyId: string;

  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  rejectReason?: string | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: PropertyDTO })
  @IsOptional()
  @ApiPropertyOptional()
  property?: PropertyDTO;
}

export class PropertyRequestsWithLogsDTO extends PropertyRequestsDTO {
  @ApiProperty({ isArray: true, type: PropertyRequestsDTO })
  @IsOptional()
  @IsArray()
  logs?: PropertyRequestsDTO[];
}

export class PropertyRequestRequestDTO extends OmitType(PropertyRequestsDTO, [
  'id',
  'user',
  'property',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreatePropertyRequestDTO extends PropertyRequestRequestDTO {}

export class UpdatePropertyRequestDTO extends PartialType(
  PropertyRequestRequestDTO,
) {}

export class FilterPropertyRequestDTO extends PartialType(
  OmitType(PropertyRequestsDTO, [
    'id',
    'user',
    'property',
    'created',
    'updated',
    'deleted',
    'status',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: StatusEnum, type: StatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusEnum[];
}
