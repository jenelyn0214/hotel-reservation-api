import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import FormData from 'form-data';

import twalaConfig from '@src/config/twala.config';
import { AxiosClient } from '@src/util/axios-client';

import {
  DocumentObjectDTO,
  DocumentResponseDTO,
  TemplateDTO,
  TwalaServerStatusDTO,
} from './contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @Inject(twalaConfig.KEY)
    private readonly contractConfig: ConfigType<typeof twalaConfig>,
  ) {}

  async send(link, method, data?: any) {
    const twalaAxiosClient = new AxiosClient(this.contractConfig.url).init();

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
    }

    const extraHeaders = data ? formData.getHeaders() : {};

    const result = await twalaAxiosClient({
      method,
      url: link,
      headers: {
        'Twala-Application-Secret': this.contractConfig.secret,
        'Twala-Application-Uuid': this.contractConfig.uuid,
        ...extraHeaders,
      },
      data: data ? formData : undefined,
    });

    return result;
  }

  async getDocuments(): Promise<DocumentObjectDTO> {
    const result = await this.send(`documents`, 'get');

    return result.data as DocumentObjectDTO;
  }

  async cancelDocument(uuid: string): Promise<DocumentObjectDTO> {
    const result = await this.send(`documents/${uuid}/cancel`, 'put');

    return result.data as DocumentObjectDTO;
  }

  async downloadDocument(uuid: string): Promise<DocumentObjectDTO> {
    const result = await this.send(`documents/${uuid}/download`, 'get');

    return result.data as DocumentObjectDTO;
  }

  async statusDocument(uuid: string): Promise<DocumentObjectDTO> {
    const result = await this.send(`documents/${uuid}/status`, 'get');

    return result.data as DocumentObjectDTO;
  }

  async statusDocuments(
    uuids: string[] | string,
  ): Promise<DocumentObjectDTO[]> {
    console.log('uuids', uuids);
    const documentTasks = Array.isArray(uuids)
      ? uuids.map((uuid) => this.send(`documents/${uuid}/status`, 'get'))
      : [this.send(`documents/${uuids}/status`, 'get')];

    const results = await Promise.all(documentTasks);

    const data = results.map((result) => result.data);

    const mergedData = data.reduce((acc, curr) => acc.concat(curr), []);

    return mergedData;
  }

  async updatePasswordDocument(uuid: string): Promise<DocumentObjectDTO> {
    const result = await this.send(`documents/${uuid}/update-password`, 'put');

    return result.data as DocumentObjectDTO;
  }

  async getTemplates(): Promise<TemplateDTO[]> {
    const result = await this.send(`templates`, 'get');

    return result.data as TemplateDTO[];
  }

  async getHealth(): Promise<TwalaServerStatusDTO> {
    const result = await this.send(`health`, 'get');

    return result.data as TwalaServerStatusDTO;
  }

  async sendContract(data: any): Promise<DocumentResponseDTO> {
    let formData = {};

    for (const [key, value] of Object.entries(data)) {
      formData = {
        ...formData,
        [key]: typeof value === 'string' ? value : JSON.stringify(value),
      };
    }

    const result = await this.send(`send`, 'post', {
      ...formData,
      embedded_signing: JSON.stringify(true),
      test: this.contractConfig.testMode,
    });

    return result.data as DocumentResponseDTO;
  }

  async verifyContract(file: any): Promise<TemplateDTO> {
    const result = await this.send(`verify`, 'post', file);

    return result.data as TemplateDTO;
  }
}
