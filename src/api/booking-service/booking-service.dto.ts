import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { RoomBookingDTO } from '@src/api/room-booking/room-booking.dto';
import { IBookingService } from '@src/interfaces';

import { ServiceDTO } from '../service/service.dto';

export class BookingServiceDTO implements IBookingService {
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
  roomBookingId: string;

  @ApiProperty({ type: RoomBookingDTO })
  @IsOptional()
  @ApiPropertyOptional()
  roomBooking?: RoomBookingDTO;

  @ApiProperty()
  @IsString()
  serviceId: string;

  @ApiProperty({ type: ServiceDTO })
  @IsOptional()
  @ApiPropertyOptional()
  service?: ServiceDTO;

  @ApiProperty()
  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class BookingServiceRequestDTO extends OmitType(BookingServiceDTO, [
  'id',
  'service',
  'roomBooking',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateBookingServiceDTO extends BookingServiceRequestDTO {}

export class UpdateBookingServiceDTO extends PartialType(
  BookingServiceRequestDTO,
) {}

export class FilterBookingServiceDTO extends PartialType(
  OmitType(BookingServiceDTO, [
    'id',
    'service',
    'roomBooking',
    'created',
    'updated',
    'deleted',
  ] as const),
) {}
