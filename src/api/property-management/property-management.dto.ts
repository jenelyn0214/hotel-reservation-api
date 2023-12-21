import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import {
  IPropertyManagement,
  IPropertyManagementBPItem,
  IPropertyManagementItem,
  IPropertyManagementOfferItem,
} from '@src/interfaces';

export class PropertyManagementItemDTO implements IPropertyManagementItem {
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
}

export class PropertyManagementItemRequestDTO extends OmitType(
  PropertyManagementItemDTO,
  ['id', 'created', 'updated', 'deleted'] as const,
) {}

export class CreatePropertyManagementItemDTO extends PropertyManagementItemRequestDTO {}

export class UpdatePropertyManagementItemDTO extends PartialType(
  PropertyManagementItemRequestDTO,
) {}

export class PropertyManagementBPItemDTO implements IPropertyManagementBPItem {
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
  billingTypeId: string;

  @ApiProperty()
  @IsString()
  name: string;
}

export class PropertyManagementBPItemRequestDTO extends OmitType(
  PropertyManagementBPItemDTO,
  ['id', 'created', 'updated', 'deleted'] as const,
) {}

export class CreatePropertyManagementBPItemDTO extends PropertyManagementBPItemRequestDTO {}

export class UpdatePropertyManagementBPItemDTO extends PartialType(
  PropertyManagementBPItemRequestDTO,
) {}

export class PropertyManagementOfferItemDTO
  implements IPropertyManagementOfferItem
{
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

  //For upload
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  title: string;
}

export class PropertyManagementOfferItemRequestDTO extends OmitType(
  PropertyManagementOfferItemDTO,
  ['id', 'created', 'updated', 'deleted'] as const,
) {}

export class CreatePropertyManagementOfferItemDTO extends PropertyManagementOfferItemRequestDTO {}

export class UpdatePropertyManagementOfferItemDTO extends PartialType(
  PropertyManagementOfferItemRequestDTO,
) {}

export class PropertyManagementDTO implements IPropertyManagement {
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

  @ApiProperty({ isArray: true, type: PropertyManagementItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  propertyType?: PropertyManagementItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  durationStay?: PropertyManagementItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  percentageIncrease?: PropertyManagementItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  increaseType?: PropertyManagementItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementBPItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  advances?: PropertyManagementBPItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementBPItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  rentalAdvances?: PropertyManagementBPItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  billingTypes?: PropertyManagementItemDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementOfferItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  offerTypes?: PropertyManagementOfferItemDTO[];
}

export class PropertyManagementRequestDTO extends OmitType(
  PropertyManagementDTO,
  ['id', 'created', 'updated', 'deleted'] as const,
) {
  @ApiProperty({ isArray: true, type: PropertyManagementItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  propertyType?: PropertyManagementItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  durationStay?: PropertyManagementItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  percentageIncrease?: PropertyManagementItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  increaseType?: PropertyManagementItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementBPItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  advances?: PropertyManagementBPItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementBPItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  rentalAdvances?: PropertyManagementBPItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  billingTypes?: PropertyManagementItemRequestDTO[];

  @ApiProperty({ isArray: true, type: PropertyManagementOfferItemRequestDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  offerTypes?: PropertyManagementOfferItemRequestDTO[];
}

export class CreatePropertyManagementDTO extends PropertyManagementRequestDTO {}

export class UpdatePropertyManagementDTO extends PartialType(
  PropertyManagementRequestDTO,
) {}
