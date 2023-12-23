import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { HallDTO } from '@src/api/hall/hall.dto';
import { BookingStatusEnum } from '@src/enums';
import { IHallBooking } from '@src/interfaces';

import { CustomerDTO } from '../customer/customer.dto';

export class HallBookingDTO implements IHallBooking {
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
  customerId: string;

  @ApiProperty({ type: CustomerDTO })
  @IsOptional()
  @ApiPropertyOptional()
  customer?: CustomerDTO;

  @ApiProperty()
  @IsString()
  hallId: string;

  @ApiProperty({ type: HallDTO })
  @IsOptional()
  @ApiPropertyOptional()
  hall?: HallDTO;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  paxCount: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: BookingStatusEnum,
  })
  @IsEnum(BookingStatusEnum)
  status: BookingStatusEnum;
}

export class HallBookingRequestDTO extends OmitType(HallBookingDTO, [
  'id',
  'customer',
  'hall',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateHallBookingDTO extends HallBookingRequestDTO {}

export class UpdateHallBookingDTO extends PartialType(HallBookingRequestDTO) {}

export class FilterHallBookingDTO extends PartialType(
  OmitType(HallBookingDTO, [
    'id',
    'customer',
    'hall',
    'created',
    'updated',
    'deleted',
    'status',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: BookingStatusEnum,
    type: BookingStatusEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: BookingStatusEnum[];
}
