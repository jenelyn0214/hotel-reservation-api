import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserDTO } from '@src/api/user/user.dto';
import { PropertyServiceRequestEnum } from '@src/enums';
import { IPropertyServiceRequest } from '@src/interfaces';

import { PropertyServiceDTO } from '../property-service/property-service.dto';

export class PropertyServiceRequestsDTO implements IPropertyServiceRequest {
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
  propertyServiceId: string;

  @ApiProperty()
  @IsString()
  rentId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  memberId?: string;

  @ApiProperty({
    enum: PropertyServiceRequestEnum,
  })
  @IsEnum(PropertyServiceRequestEnum)
  status: PropertyServiceRequestEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  rejectReason?: string | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: PropertyServiceDTO })
  @IsOptional()
  @ApiPropertyOptional()
  propertyService?: PropertyServiceDTO;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  start?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  end?: Date;
}

export class PropertyServiceRequestsWithLogsDTO extends PropertyServiceRequestsDTO {
  @ApiProperty({ isArray: true, type: PropertyServiceRequestsDTO })
  @IsOptional()
  @IsArray()
  logs?: PropertyServiceRequestsDTO[];
}

export class PropertyServiceRequestRequestDTO extends OmitType(
  PropertyServiceRequestsDTO,
  ['id', 'user', 'propertyService', 'created', 'updated', 'deleted'] as const,
) {}

export class CreatePropertyServiceRequestDTO extends PropertyServiceRequestRequestDTO {}

export class UpdatePropertyServiceRequestDTO extends PartialType(
  PropertyServiceRequestRequestDTO,
) {}

export class FilterPropertyServiceRequestDTO extends PartialType(
  OmitType(PropertyServiceRequestsDTO, [
    'id',
    'user',
    'propertyService',
    'created',
    'updated',
    'deleted',
    'status',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: PropertyServiceRequestEnum,
    type: PropertyServiceRequestEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: PropertyServiceRequestEnum[];
}
