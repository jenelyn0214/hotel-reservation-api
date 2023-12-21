import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import {
  ICancelTransaction,
  ICancelTransactionResponse,
  ICheckout,
  ICheckoutResponse,
  IFetchTransactionResponse,
  IPostbackExtras,
  IPostbackNotification,
} from '@src/interfaces';

export class CheckoutDTO implements ICheckout {
  @ApiProperty()
  @IsString()
  req_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  client_id?: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  expiry: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  notification_url?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  redirect_url?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  param1?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  param2?: string;
}

export class CheckoutResponseDTO implements ICheckoutResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  uid: string;

  @ApiProperty()
  checkout_url: string;
}

export class CancelTransactionDTO implements ICancelTransaction {
  @ApiProperty()
  @IsString()
  req_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  client_id?: string;

  @ApiProperty()
  @IsString()
  reason: string;
}

export class CancelTransactionResponseDTO
  implements ICancelTransactionResponse
{
  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;
}
export class PostbackExtrasDTO implements IPostbackExtras {
  @ApiProperty()
  @IsNumber()
  fee: number;

  @ApiProperty()
  @IsString()
  param1: string;

  @ApiProperty()
  @IsString()
  param2: string;
}

export class PostbackNotificationDTO implements IPostbackNotification {
  @ApiProperty()
  @IsString()
  req_id: string;

  @ApiProperty()
  @IsString()
  client_id: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  signature: string;

  @ApiProperty()
  @IsString()
  ref_code: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty({ type: PostbackExtrasDTO })
  @ApiPropertyOptional()
  extras: PostbackExtrasDTO;
}

export class FetchTransactionResponseDTO implements IFetchTransactionResponse {
  @ApiProperty()
  @IsString()
  req_id: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  ref_code: string;

  @ApiProperty()
  @IsString()
  image_url: string;

  @ApiProperty()
  @IsString()
  seller_name: string;

  @ApiProperty()
  @IsString()
  channel: string;

  @ApiProperty()
  @IsString()
  expiry: string;

  @ApiProperty()
  @IsString()
  created: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsString()
  payment_url: string;

  @ApiProperty()
  @IsString()
  instructions: string;
}
