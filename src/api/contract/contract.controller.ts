import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@src/common/decorators';

import {
  DocumentObjectDTO,
  DocumentResponseDTO,
  TemplateDTO,
  TwalaServerStatusDTO,
} from './contract.dto';
import { ContractService } from './contract.service';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('/documents')
  @ApiResponse({
    type: DocumentObjectDTO,
  })
  async getDocuments(): Promise<DocumentObjectDTO> {
    return this.contractService.getDocuments();
  }

  @Public()
  @Put('/documents/:uuid/cancel')
  @ApiResponse({
    type: DocumentObjectDTO,
  })
  async cancelDocument(
    @Param('uuid') uuid: string,
  ): Promise<DocumentObjectDTO> {
    return this.contractService.cancelDocument(uuid);
  }

  @Get('/documents/:uuid/download')
  @ApiResponse({
    type: DocumentObjectDTO,
  })
  async downloadDocument(
    @Param('uuid') uuid: string,
  ): Promise<DocumentObjectDTO> {
    return this.contractService.downloadDocument(uuid);
  }

  @Public()
  @Get('/documents/:uuid/status')
  @ApiResponse({
    type: DocumentObjectDTO,
  })
  async statusDocument(
    @Param('uuid') uuid: string,
  ): Promise<DocumentObjectDTO> {
    return this.contractService.statusDocument(uuid);
  }
  @Get('/documents/status')
  @ApiResponse({
    type: [DocumentObjectDTO],
  })
  async statusDocuments(
    @Query('uuid') uuids: string[],
  ): Promise<DocumentObjectDTO[]> {
    return this.contractService.statusDocuments(uuids);
  }

  @Get('/documents/:uuid/update-password')
  @ApiResponse({
    type: DocumentObjectDTO,
  })
  async updatePasswordDocument(
    @Param('uuid') uuid: string,
  ): Promise<DocumentObjectDTO> {
    return this.contractService.updatePasswordDocument(uuid);
  }

  @Public()
  @Get('/templates')
  @ApiResponse({
    type: [TemplateDTO],
  })
  async getTemplates(): Promise<TemplateDTO[]> {
    return this.contractService.getTemplates();
  }

  @Post('/verify')
  @ApiResponse({
    type: TemplateDTO,
  })
  async verifyContract(@Body() data: any): Promise<TemplateDTO> {
    return this.contractService.verifyContract(data);
  }

  @Get('/health')
  @ApiResponse({
    type: TwalaServerStatusDTO,
  })
  async getHealth(): Promise<TwalaServerStatusDTO> {
    return this.contractService.getHealth();
  }

  @Public()
  @Post('/send')
  @ApiResponse({
    type: DocumentResponseDTO,
  })
  async sendContract(@Body() data: any): Promise<DocumentResponseDTO> {
    return this.contractService.sendContract(data);
  }
}
