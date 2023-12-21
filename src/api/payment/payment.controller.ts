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
  CreatePaymentDTO,
  FilterPaymentDTO,
  PaymentDTO,
  UpdatePaymentDTO,
} from './payment.dto';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @Post()
  @ApiResponse({
    type: PaymentDTO,
  })
  async create(
    @Body() createPaymentDTO: CreatePaymentDTO,
  ): Promise<PaymentDTO> {
    return this.paymentService.create(createPaymentDTO);
  }

  @Get()
  @ApiResponse({
    type: [PaymentDTO],
  })
  async findAll(): Promise<PaymentDTO[]> {
    return this.paymentService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [PaymentDTO],
  })
  async search(
    @Query() filterPaymentDTO: FilterPaymentDTO,
  ): Promise<PaymentDTO[]> {
    return this.paymentService.findByFilter(filterPaymentDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [PaymentDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<PaymentDTO[]> {
    return this.paymentService.getPaymentsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: PaymentDTO,
  })
  findOne(@Param('id') id: string): Promise<PaymentDTO> {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: PaymentDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDTO: UpdatePaymentDTO,
  ): Promise<PaymentDTO> {
    return this.paymentService.update(id, updatePaymentDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.paymentService.remove(id);
  }
}
