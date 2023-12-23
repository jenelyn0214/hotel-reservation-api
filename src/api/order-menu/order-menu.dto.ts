import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { MenuDTO } from '@src/api/menu/menu.dto';
import { IOrderMenu } from '@src/interfaces';

import { OrderDTO } from '../order/order.dto';

export class OrderMenuDTO implements IOrderMenu {
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
  orderId: string;

  @ApiProperty({ type: OrderDTO })
  @IsOptional()
  @ApiPropertyOptional()
  order?: OrderDTO;

  @ApiProperty()
  @IsString()
  menuId: string;

  @ApiProperty({ type: MenuDTO })
  @IsOptional()
  @ApiPropertyOptional()
  menu?: MenuDTO;

  @ApiProperty()
  @IsNumber()
  qty: number;
}

export class OrderMenuRequestDTO extends OmitType(OrderMenuDTO, [
  'id',
  'order',
  'menu',
  'created',
  'updated',
  'deleted',
] as const) {}

export class CreateOrderMenuDTO extends OrderMenuRequestDTO {}

export class UpdateOrderMenuDTO extends PartialType(OrderMenuRequestDTO) {}

export class FilterOrderMenuDTO extends PartialType(
  OmitType(OrderMenuDTO, [
    'id',
    'order',
    'menu',
    'created',
    'updated',
    'deleted',
  ] as const),
) {}
