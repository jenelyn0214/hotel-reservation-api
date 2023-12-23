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
  BookingServiceDTO,
  CreateBookingServiceDTO,
  FilterBookingServiceDTO,
  UpdateBookingServiceDTO,
} from './booking-service.dto';
import { BookingServiceService } from './booking-service.service';

@ApiTags('booking service')
@Controller('booking-service')
export class BookingServiceController {
  constructor(private readonly bookingServiceService: BookingServiceService) {}

  @Post()
  @ApiResponse({
    type: BookingServiceDTO,
  })
  async create(
    @Body() createBookingServiceDTO: CreateBookingServiceDTO,
  ): Promise<BookingServiceDTO> {
    return this.bookingServiceService.create(createBookingServiceDTO);
  }

  @Get()
  @ApiResponse({
    type: [BookingServiceDTO],
  })
  async findAll(): Promise<BookingServiceDTO[]> {
    return this.bookingServiceService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [BookingServiceDTO],
  })
  async search(
    @Query() filterBookingServiceDTO: FilterBookingServiceDTO,
  ): Promise<BookingServiceDTO[]> {
    return this.bookingServiceService.findByFilter(filterBookingServiceDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: FilterBookingServiceDTO,
  })
  findOne(@Param('id') id: string): Promise<BookingServiceDTO> {
    return this.bookingServiceService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: BookingServiceDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateBookingServiceDTO: UpdateBookingServiceDTO,
  ): Promise<BookingServiceDTO> {
    return this.bookingServiceService.update(id, updateBookingServiceDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.bookingServiceService.remove(id);
  }
}
