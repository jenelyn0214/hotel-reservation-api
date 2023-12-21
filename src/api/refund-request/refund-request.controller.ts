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
  CreateRefundRequestDTO,
  FilterRefundRequestDTO,
  RefundRequestDTO,
  UpdateRefundRequestDTO,
} from './refund-request.dto';
import { RefundRequestService } from './refund-request.service';

@ApiTags('refund request')
@Controller('refund-request')
export class RefundRequestController {
  constructor(private readonly refundRequestService: RefundRequestService) {}

  @Post()
  @ApiResponse({
    type: RefundRequestDTO,
  })
  async create(
    @Body() createRefundRequestDTO: CreateRefundRequestDTO,
  ): Promise<RefundRequestDTO> {
    return this.refundRequestService.create(createRefundRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [RefundRequestDTO],
  })
  async findAll(): Promise<RefundRequestDTO[]> {
    return this.refundRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [RefundRequestDTO],
  })
  async search(
    @Query() filterRefundRequestDTO: FilterRefundRequestDTO,
  ): Promise<RefundRequestDTO[]> {
    return this.refundRequestService.findByFilter(filterRefundRequestDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [RefundRequestDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<RefundRequestDTO[]> {
    return this.refundRequestService.getRequestsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: RefundRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<RefundRequestDTO> {
    return this.refundRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RefundRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRefundRequestDTO: UpdateRefundRequestDTO,
  ): Promise<RefundRequestDTO> {
    return this.refundRequestService.update(id, updateRefundRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.refundRequestService.remove(id);
  }
}
