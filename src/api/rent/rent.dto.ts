import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  PropertyManagementBPItemDTO,
  PropertyManagementItemDTO,
} from '@src/api/property-management/property-management.dto';
import { PropertyDTO } from '@src/api/property/property.dto';
import { RoomDTO } from '@src/api/room/room.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { PaymentModeEnum, RentStatusEnum } from '@src/enums';
import { IRent, IRentCompanion } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class RentCompanionDTO implements IRentCompanion {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  image: string;
}

export class RentDTO implements IRent {
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
  REID?: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  propertyId: string;

  @ApiProperty()
  @IsString()
  roomId: string;

  @ApiProperty({
    enum: RentStatusEnum,
  })
  @IsEnum(RentStatusEnum)
  status: RentStatusEnum;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  extensionDate?: Date | null;

  @ApiProperty()
  @IsNumber()
  baseAmount: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  increaseRate?: number | null;

  @ApiProperty()
  @IsNumber()
  payment: number;

  @ApiProperty({
    enum: PaymentModeEnum,
  })
  @IsEnum(PaymentModeEnum)
  paymentMode: PaymentModeEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  contractUUID?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  renterSignedContract?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'renterSigned'))
  @IsBoolean()
  renterSigned?: boolean | false;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  propertyOwnerSignedContract?: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'propertyOwnerSigned'))
  @IsBoolean()
  propertyOwnerSigned?: boolean | false;

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

  @ApiProperty({ isArray: true, type: RentCompanionDTO })
  @IsOptional()
  @ApiPropertyOptional()
  @IsArray()
  companions?: RentCompanionDTO[];

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: PropertyDTO })
  @IsOptional()
  @ApiPropertyOptional()
  property?: PropertyDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;
}

export class RentRequestDTO extends OmitType(RentDTO, [
  'id',
  'REID',
  'user',
  'room',
  'property',
  'minimumStay',
  'advance',
  'rentalAdvance',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRentDTO extends RentRequestDTO {}

export class UpdateRentDTO extends PartialType(RentRequestDTO) {}

export class FilterRentDTO extends PartialType(
  OmitType(RentDTO, [
    'id',
    'user',
    'room',
    'property',
    'minimumStay',
    'advance',
    'rentalAdvance',
    'created',
    'updated',
    'deleted',
    'status',
    'paymentMode',
    'roomId',
    'propertyId',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: RentStatusEnum,
    type: RentStatusEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: RentStatusEnum[];

  @ApiProperty({
    isArray: true,
    enum: PaymentModeEnum,
    type: PaymentModeEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  paymentMode?: PaymentModeEnum[];

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @ApiPropertyOptional()
  roomId?: string[];

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @ApiPropertyOptional()
  propertyId?: string[];
}
