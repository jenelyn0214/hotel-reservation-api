import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { BusinessDTO } from '@src/api/business/business.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { StatusEnum } from '@src/enums';
import {
  IService,
  IServiceItem,
  IServiceItemVariants,
  IServiceReview,
} from '@src/interfaces';

export class ServiceItemVariantsDTO implements IServiceItemVariants {
  @ApiProperty()
  @IsString()
  variant: string;

  @ApiProperty()
  @IsNumber()
  rate: number;
}

export class ServiceItemDTO implements IServiceItem {
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
  item: string;

  @ApiProperty()
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsString()
  photo: string;

  @ApiProperty({ isArray: true, type: ServiceItemVariantsDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  variants?: ServiceItemVariantsDTO[];
}

export class ServiceItemRequestDTO extends OmitType(ServiceItemDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateServiceItemDTO extends ServiceItemRequestDTO {}

export class UpdateServiceItemDTO extends PartialType(ServiceItemRequestDTO) {}

export class ServiceReviewDTO implements IServiceReview {
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
  message: string;

  @ApiProperty()
  @IsNumber()
  starRating: number;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;
}

export class ServiceReviewRequestDTO extends OmitType(ServiceReviewDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateServiceReviewDTO extends ServiceReviewRequestDTO {}

export class UpdateServiceReviewDTO extends PartialType(
  ServiceReviewRequestDTO,
) {}

export class ServiceDTO implements IService {
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
  SID?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  slug?: string;

  @ApiProperty()
  @IsString()
  businessId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  contactPerson: string;

  @ApiProperty()
  @IsString()
  contactNumber: string;

  @ApiProperty()
  @IsNumber()
  maxService: number;

  @ApiProperty()
  @IsNumber()
  noService: number;

  @ApiProperty()
  @IsString()
  photo: string;

  @ApiProperty({
    enum: StatusEnum,
  })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty({ isArray: true, type: ServiceItemDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  items?: ServiceItemDTO[];

  @ApiProperty({ isArray: true, type: ServiceReviewDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  reviews?: ServiceReviewDTO[];

  @ApiProperty({ type: BusinessDTO })
  @IsOptional()
  @ApiPropertyOptional()
  business?: BusinessDTO;
}

export class ServiceRequestDTO extends OmitType(ServiceDTO, [
  'id',
  'SID',
  'slug',
  'business',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateServiceDTO extends ServiceRequestDTO {}

export class UpdateServiceDTO extends PartialType(ServiceRequestDTO) {}

export class FilterServiceDTO extends PartialType(
  OmitType(ServiceDTO, [
    'id',
    'business',
    'created',
    'updated',
    'deleted',
    'items',
    'reviews',
    'status',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: StatusEnum, type: StatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: StatusEnum[];
}
