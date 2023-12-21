import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  PropertyManagementBPItemDTO,
  PropertyManagementItemDTO,
  PropertyManagementOfferItemDTO,
} from '@src/api/property-management/property-management.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { PropertyStatusEnum } from '@src/enums';
import { IProperty, IPropertyOptions } from '@src/interfaces';

export class PropertyOptionsDTO implements IPropertyOptions {
  @ApiProperty()
  @IsBoolean()
  enableAutoReply: boolean;

  @ApiProperty()
  @IsString()
  autoReplyMessage: string;
}

export class PropertyDTO implements IProperty {
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
  LPID?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  slug?: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty()
  @IsString()
  propertyTypeId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  propertyType?: PropertyManagementItemDTO | null;

  @ApiProperty()
  @IsString()
  minimumStayId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  minimumStay?: PropertyManagementItemDTO | null;

  @ApiProperty()
  @IsString()
  percentageIncreaseId: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  percentageIncrease?: PropertyManagementItemDTO | null;

  @ApiProperty()
  @IsString()
  increaseTypeId: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  increaseType?: PropertyManagementItemDTO | null;

  @ApiProperty()
  @IsString()
  advanceId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  advance?: PropertyManagementBPItemDTO | null;

  @ApiProperty()
  @IsString()
  rentalAdvanceId: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  rentalAdvance?: PropertyManagementBPItemDTO | null;

  @ApiProperty()
  @IsString()
  billingTypeId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  billingType?: PropertyManagementItemDTO | null;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  streetName: string;

  @ApiProperty()
  @IsString()
  building: string;

  @ApiProperty()
  @IsString()
  houseNo: string;

  @ApiProperty()
  @IsString()
  barangay: string;

  @ApiProperty()
  @IsString()
  barangayId: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  cityId: string;

  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  provinceId: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsString()
  regionId: string;

  @ApiProperty()
  @IsString()
  others: string;

  @ApiProperty()
  @IsString()
  mapPin: string;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  offerIds?: string[];

  @ApiProperty({ isArray: true, type: PropertyManagementOfferItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  offers?: PropertyManagementOfferItemDTO[];

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  propertyImages?: string[];

  @ApiProperty()
  @IsString()
  businessPermit: string;

  @ApiProperty({
    enum: PropertyStatusEnum,
  })
  @IsEnum(PropertyStatusEnum)
  status: PropertyStatusEnum;

  @ApiProperty()
  @IsNumber()
  starRating: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsObject()
  options?: PropertyOptionsDTO;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;
}

export class PropertyRequestDTO extends OmitType(PropertyDTO, [
  'id',
  'LPID',
  'slug',
  'created',
  'updated',
  'deleted',
  'propertyType',
  'minimumStay',
  'percentageIncrease',
  'increaseType',
  'advance',
  'rentalAdvance',
  'billingType',
  'offers',
  'user',
] as const) {}

export class CreatePropertyDTO extends PropertyRequestDTO {}

export class UpdatePropertyDTO extends PartialType(PropertyRequestDTO) {}

export class FilterPropertyDTO extends PartialType(
  OmitType(PropertyDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'propertyType',
    'minimumStay',
    'percentageIncrease',
    'increaseType',
    'advance',
    'rentalAdvance',
    'billingType',
    'offers',
    'user',
    'logo',
    'propertyImages',
    'status',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: PropertyStatusEnum,
    type: PropertyStatusEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: PropertyStatusEnum[];
}
