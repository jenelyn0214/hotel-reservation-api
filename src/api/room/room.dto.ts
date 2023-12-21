import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PropertyDTO } from '@src/api/property/property.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { RoomStatusEnum } from '@src/enums';
import { IRoom, IRoomReview, IRoomReviewResponse } from '@src/interfaces';

export class RoomReviewResponseDTO implements IRoomReviewResponse {
  @ApiProperty()
  @IsString()
  message: string;

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
}

export class RoomReviewDTO implements IRoomReview {
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

  @ApiProperty({
    nullable: true,
    type: RoomReviewResponseDTO,
    oneOf: [{ type: 'null' }],
  })
  @Type(() => RoomReviewResponseDTO)
  @IsOptional()
  response: RoomReviewResponseDTO | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;
}

export class RoomReviewRequestDTO extends OmitType(RoomReviewDTO, [
  'id',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRoomReviewDTO extends RoomReviewRequestDTO {}

export class UpdateRoomReviewDTO extends PartialType(RoomReviewRequestDTO) {}

export class RoomDTO implements IRoom {
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
  ROID?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  slug?: string;

  @ApiProperty()
  @IsString()
  propertyId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsNumber()
  maxCapacity: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  contract?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  signedContract?: string;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  offers?: string[];

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  publicUtilities?: string[];

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  images?: string[];

  @ApiProperty()
  @IsNumber()
  starRating: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  noOfCompanions?: number;

  @ApiProperty({
    enum: RoomStatusEnum,
  })
  @IsEnum(RoomStatusEnum)
  status: RoomStatusEnum;

  @ApiProperty({ isArray: true, type: RoomReviewDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  reviews?: RoomReviewDTO[];

  @ApiProperty({ type: PropertyDTO })
  @IsOptional()
  @ApiPropertyOptional()
  property?: PropertyDTO;
}

export class RoomRequestDTO extends OmitType(RoomDTO, [
  'id',
  'ROID',
  'slug',
  'property',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRoomDTO extends RoomRequestDTO {}

export class UpdateRoomDTO extends PartialType(RoomRequestDTO) {}

export class FilterRoomDTO extends PartialType(
  OmitType(RoomDTO, [
    'id',
    'property',
    'created',
    'updated',
    'deleted',
    'status',
    'images',
    'reviews',
    'propertyId',
  ] as const),
) {
  @ApiProperty({ isArray: true, enum: RoomStatusEnum, type: RoomStatusEnum })
  @IsOptional()
  @ApiPropertyOptional()
  status?: RoomStatusEnum[];

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @ApiPropertyOptional()
  propertyId?: string[];
}
