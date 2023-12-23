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
  CreateOrderMenuDTO,
  FilterOrderMenuDTO,
  OrderMenuDTO,
  UpdateOrderMenuDTO,
} from './order-menu.dto';
import { OrderMenuService } from './order-menu.service';

@ApiTags('order menu')
@Controller('order-menu')
export class OrderMenuController {
  constructor(private readonly roomBookingService: OrderMenuService) {}

  @Post()
  @ApiResponse({
    type: OrderMenuDTO,
  })
  async create(
    @Body() createOrderMenuDTO: CreateOrderMenuDTO,
  ): Promise<OrderMenuDTO> {
    return this.roomBookingService.create(createOrderMenuDTO);
  }

  @Get()
  @ApiResponse({
    type: [OrderMenuDTO],
  })
  async findAll(): Promise<OrderMenuDTO[]> {
    return this.roomBookingService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [OrderMenuDTO],
  })
  async search(
    @Query() filterOrderMenuDTO: FilterOrderMenuDTO,
  ): Promise<OrderMenuDTO[]> {
    return this.roomBookingService.findByFilter(filterOrderMenuDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: FilterOrderMenuDTO,
  })
  findOne(@Param('id') id: string): Promise<OrderMenuDTO> {
    return this.roomBookingService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: OrderMenuDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderMenuDTO: UpdateOrderMenuDTO,
  ): Promise<OrderMenuDTO> {
    return this.roomBookingService.update(id, updateOrderMenuDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.roomBookingService.remove(id);
  }
}
