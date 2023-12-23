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

import { RoomDTO } from '@src/api/room/room.dto';
import { BookingStatusEnum } from '@src/enums';
import { IRoomBooking } from '@src/interfaces';

import { CustomerDTO } from '../customer/customer.dto';

export class RoomBookingDTO implements IRoomBooking {
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
  roomId: string;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;

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
  adultCount: number;

  @ApiProperty()
  @IsNumber()
  childCount: number;

  @ApiProperty()
  @IsNumber()
  seniorCount: number;

  @ApiProperty()
  @IsNumber()
  subTotalAmount: number;

  @ApiProperty()
  @IsNumber()
  discountAmount: number;

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    enum: BookingStatusEnum,
  })
  @IsEnum(BookingStatusEnum)
  status: BookingStatusEnum;
}

export class RoomBookingRequestDTO extends OmitType(RoomBookingDTO, [
  'id',
  'customer',
  'room',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateRoomBookingDTO extends RoomBookingRequestDTO {}

export class UpdateRoomBookingDTO extends PartialType(RoomBookingRequestDTO) {}

export class FilterRoomBookingDTO extends PartialType(
  OmitType(RoomBookingDTO, [
    'id',
    'customer',
    'room',
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
