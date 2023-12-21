import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@src/common/decorators';

import {
  CancelTransactionDTO,
  CancelTransactionResponseDTO,
  CheckoutDTO,
  CheckoutResponseDTO,
  FetchTransactionResponseDTO,
} from './bux.dto';
import { BUXService } from './bux.service';

@ApiTags('bux')
@Controller('bux')
export class BUXController {
  constructor(private readonly buxService: BUXService) {}

  @Public()
  @Post('/checkout')
  @ApiResponse({
    type: CheckoutResponseDTO,
  })
  async checkout(@Body() data: CheckoutDTO): Promise<CheckoutResponseDTO> {
    return this.buxService.checkout(data);
  }

  @Post('/cancel-transaction')
  @ApiResponse({
    type: CancelTransactionResponseDTO,
  })
  async cancel(
    @Body() data: CancelTransactionDTO,
  ): Promise<CancelTransactionResponseDTO> {
    return this.buxService.cancel(data);
  }

  @Get('/fetch-transaction/:reqId')
  @ApiResponse({
    type: FetchTransactionResponseDTO,
  })
  async fetch(
    @Param('reqId') reqId: string,
  ): Promise<FetchTransactionResponseDTO> {
    return this.buxService.fetch(reqId);
  }
}
