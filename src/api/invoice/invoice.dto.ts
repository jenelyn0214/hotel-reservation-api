import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaymentDTO } from '@src/api/payment/payment.dto';
import { RentDTO } from '@src/api/rent/rent.dto';
import { RoomDTO } from '@src/api/room/room.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { InvoiceStatusEnum } from '@src/enums';
import { IInvoice } from '@src/interfaces';
import { parseBoolean } from '@src/util/dto-util';

export class InvoiceDTO implements IInvoice {
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
  rentId: string;

  @ApiProperty()
  @IsString()
  roomId: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  paymentId: string | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  IVID?: string;

  @ApiProperty()
  @IsString()
  referenceNumber: string;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  checkoutURL?: string | null;

  @ApiProperty()
  @IsNumber()
  baseAmount: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  increaseRate?: number | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  interestAmount?: number | 0;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  interestDays?: number | 0;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    enum: InvoiceStatusEnum,
  })
  @IsEnum(InvoiceStatusEnum)
  status: InvoiceStatusEnum;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'confirmed'))
  @IsBoolean()
  confirmed?: boolean | true;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && parseBoolean(value, 'isManual'))
  @IsBoolean()
  isManual?: boolean | false;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  paidDate?: Date | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;

  @ApiProperty({ type: RentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  rent?: RentDTO;

  @ApiProperty({ type: PaymentDTO })
  @IsOptional()
  @ApiPropertyOptional()
  payment?: PaymentDTO;
}

export class InvoiceRequestDTO extends OmitType(InvoiceDTO, [
  'id',
  'IVID',
  'user',
  'room',
  'rent',
  'payment',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateInvoiceDTO extends InvoiceRequestDTO {}

export class UpdateInvoiceDTO extends PartialType(InvoiceRequestDTO) {}

export class FilterInvoiceDTO extends PartialType(
  OmitType(InvoiceDTO, [
    'id',
    'user',
    'room',
    'rent',
    'payment',
    'created',
    'updated',
    'deleted',
    'status',
    'rentId',
    'roomId',
  ] as const),
) {
  @ApiProperty({
    isArray: true,
    enum: InvoiceStatusEnum,
    type: InvoiceStatusEnum,
  })
  @IsOptional()
  @ApiPropertyOptional()
  status?: InvoiceStatusEnum[];

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @ApiPropertyOptional()
  rentId?: string[];

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @ApiPropertyOptional()
  roomId?: string[];
}
