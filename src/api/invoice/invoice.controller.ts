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

import { Public } from '@src/common/decorators';

import {
  CreateInvoiceDTO,
  FilterInvoiceDTO,
  InvoiceDTO,
  UpdateInvoiceDTO,
} from './invoice.dto';
import { InvoiceService } from './invoice.service';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Public()
  @Post()
  @ApiResponse({
    type: InvoiceDTO,
  })
  async create(
    @Body() createInvoiceDTO: CreateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    return this.invoiceService.create(createInvoiceDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [InvoiceDTO],
  })
  async findAll(): Promise<InvoiceDTO[]> {
    return this.invoiceService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [InvoiceDTO],
  })
  async search(
    @Query() filterInvoiceDTO: FilterInvoiceDTO,
  ): Promise<InvoiceDTO[]> {
    return this.invoiceService.findByFilter(filterInvoiceDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [InvoiceDTO],
  })
  async getInvoicesByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<InvoiceDTO[]> {
    return this.invoiceService.getInvoicesByPropertyOwner(userId);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: InvoiceDTO,
  })
  findOne(@Param('id') id: string): Promise<InvoiceDTO> {
    return this.invoiceService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiResponse({
    type: InvoiceDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDTO: UpdateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    return this.invoiceService.update(id, updateInvoiceDTO);
  }

  @Public()
  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.invoiceService.remove(id);
  }
}
