import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import buxConfig from '@src/config/bux.config';
import cConfig from '@src/config/common.config';
import { AxiosClient } from '@src/util/axios-client';

import {
  CancelTransactionDTO,
  CancelTransactionResponseDTO,
  CheckoutDTO,
  CheckoutResponseDTO,
  FetchTransactionResponseDTO,
} from './bux.dto';

@Injectable()
export class BUXService {
  constructor(
    @Inject(buxConfig.KEY)
    private readonly paymentConfig: ConfigType<typeof buxConfig>,
    @Inject(cConfig.KEY)
    private readonly commonConfig: ConfigType<typeof cConfig>,
  ) {}

  async send(link, method, data?: any) {
    const twalaAxiosClient = new AxiosClient(this.paymentConfig.url).init();

    const paramData =
      method === 'get'
        ? {}
        : {
            ...data,
            client_id: this.paymentConfig.clientId,
            enabled_channels: this.paymentConfig.enabledChannels,
          };

    const paramQuery =
      method === 'get'
        ? {
            ...data,
            client_id: this.paymentConfig.clientId,
            enabled_channels: this.paymentConfig.enabledChannels,
          }
        : {};

    const result = await twalaAxiosClient({
      method,
      url: link,
      headers: {
        'x-api-key': this.paymentConfig.apiKey,
      },
      data: paramData,
      params: paramQuery,
    });

    return result;
  }

  async checkout(checkoutDTO: CheckoutDTO): Promise<CheckoutResponseDTO> {
    const result = await this.send('open/checkout', 'post', checkoutDTO);

    return result.data as CheckoutResponseDTO;
  }

  async cancel(
    cancelTransactionDTO: CancelTransactionDTO,
  ): Promise<CancelTransactionResponseDTO> {
    const result = await this.send(
      'cancel_transaction',
      'post',
      cancelTransactionDTO,
    );

    return result.data as CancelTransactionResponseDTO;
  }

  async fetch(reqId: string): Promise<FetchTransactionResponseDTO> {
    const result = await this.send('check_code', 'get', {
      req_id: reqId,
      mode: 'API',
    });

    return result.data as FetchTransactionResponseDTO;
  }
}
