import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { RoomDTO } from '@src/api/room/room.dto';
import { BookingStatusEnum, OrderStatusEnum, PaymentType } from '@src/enums';
import { IOrder } from '@src/interfaces';

import { QueueDTO } from '../queue/queue.dto';
import { RoomBookingDTO } from '../room-booking/room-booking.dto';

export class OrderDTO implements IOrder {
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
  @IsNumber()
  paxCount: number;

  @ApiProperty()
  @IsNumber()
  subTotalAmount: number;

  @ApiProperty()
  @IsNumber()
  totalQty: number;

  @ApiProperty()
  @IsNumber()
  seniorCount: number;

  @ApiProperty()
  @IsNumber()
  discountAmount: number;

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    enum: PaymentType,
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @ApiProperty()
  @IsString()
  roomBookingId: string;

  @ApiProperty({ type: RoomBookingDTO })
  @IsOptional()
  @ApiPropertyOptional()
  roomBooking?: RoomBookingDTO;

  @ApiProperty()
  @IsString()
  roomId: string;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;

  @ApiProperty()
  @IsString()
  queueId: string;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  queue?: QueueDTO;

  @ApiProperty({
    enum: OrderStatusEnum,
  })
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}

export class OrderRequestDTO extends OmitType(OrderDTO, [
  'id',
  'roomBooking',
  'room',
  'queue',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateOrderDTO extends OrderRequestDTO {}

export class UpdateOrderDTO extends PartialType(OrderRequestDTO) {}

export class FilterOrderDTO extends PartialType(
  OmitType(OrderDTO, [
    'id',
    'roomBooking',
    'status',
    'paymentType',
    'queue',
    'room',
    'created',
    'updated',
    'deleted',
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

  @ApiProperty({
    isArray: true,
    enum: PaymentType,
    type: PaymentType,
  })
  @IsOptional()
  @ApiPropertyOptional()
  paymentType?: BookingStatusEnum[];
}
