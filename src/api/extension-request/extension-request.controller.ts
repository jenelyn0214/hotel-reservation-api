import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateExtensionRequestDTO,
  ExtensionRequestDTO,
  FilterExtensionRequestDTO,
  UpdateExtensionRequestDTO,
} from './extension-request.dto';
import { ExtensionRequestService } from './extension-request.service';

@ApiTags('extension request')
@Controller('extension-request')
export class ExtensionRequestController {
  constructor(
    private readonly extensionRequestService: ExtensionRequestService,
  ) {}

  @Post()
  @ApiResponse({
    type: ExtensionRequestDTO,
  })
  async create(
    @Body() createExtensionRequestDTO: CreateExtensionRequestDTO,
  ): Promise<ExtensionRequestDTO> {
    return this.extensionRequestService.create(createExtensionRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [ExtensionRequestDTO],
  })
  async findAll(): Promise<ExtensionRequestDTO[]> {
    return this.extensionRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [ExtensionRequestDTO],
  })
  async search(
    @Query() filterExtensionRequestDTO: FilterExtensionRequestDTO,
  ): Promise<ExtensionRequestDTO[]> {
    return this.extensionRequestService.findByFilter(filterExtensionRequestDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [ExtensionRequestDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<ExtensionRequestDTO[]> {
    return this.extensionRequestService.getRequestsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: ExtensionRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<ExtensionRequestDTO> {
    return this.extensionRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ExtensionRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateExtensionRequestDTO: UpdateExtensionRequestDTO,
  ): Promise<ExtensionRequestDTO> {
    return this.extensionRequestService.update(id, updateExtensionRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.extensionRequestService.remove(id);
  }
}
