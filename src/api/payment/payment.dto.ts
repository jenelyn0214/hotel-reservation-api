import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

import { RoomDTO } from '@src/api/room/room.dto';
import { UserDTO } from '@src/api/user/user.dto';
import { IPayment } from '@src/interfaces';

export class PaymentDTO implements IPayment {
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
  roomId: string;

  @ApiProperty()
  @IsString()
  referenceNumber: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  interest: number;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  month?: number | null;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  year?: number | null;

  @ApiProperty({ type: UserDTO })
  @IsOptional()
  @ApiPropertyOptional()
  user?: UserDTO;

  @ApiProperty({ type: RoomDTO })
  @IsOptional()
  @ApiPropertyOptional()
  room?: RoomDTO;
}

export class PaymentRequestDTO extends OmitType(PaymentDTO, [
  'id',
  'user',
  'room',
  'created',
  'updated',
  'deleted',
  'roomId',
] as const) {}

export class CreatePaymentDTO extends PaymentRequestDTO {}

export class UpdatePaymentDTO extends PartialType(PaymentRequestDTO) {}

export class FilterPaymentDTO extends PartialType(PaymentRequestDTO) {
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  createdFrom?: Date;

  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  createdTo?: Date;

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @ApiPropertyOptional()
  roomId?: string[];
}
