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
  CreateOrderDTO,
  FilterOrderDTO,
  OrderDTO,
  UpdateOrderDTO,
} from './order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly roomBookingService: OrderService) {}

  @Post()
  @ApiResponse({
    type: OrderDTO,
  })
  async create(@Body() createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    return this.roomBookingService.create(createOrderDTO);
  }

  @Get()
  @ApiResponse({
    type: [OrderDTO],
  })
  async findAll(): Promise<OrderDTO[]> {
    return this.roomBookingService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [OrderDTO],
  })
  async search(@Query() filterOrderDTO: FilterOrderDTO): Promise<OrderDTO[]> {
    return this.roomBookingService.findByFilter(filterOrderDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: FilterOrderDTO,
  })
  findOne(@Param('id') id: string): Promise<OrderDTO> {
    return this.roomBookingService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: OrderDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ): Promise<OrderDTO> {
    return this.roomBookingService.update(id, updateOrderDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.roomBookingService.remove(id);
  }
}
