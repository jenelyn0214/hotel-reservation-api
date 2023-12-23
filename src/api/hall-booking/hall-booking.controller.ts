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
  CreateHallBookingDTO,
  FilterHallBookingDTO,
  HallBookingDTO,
  UpdateHallBookingDTO,
} from './hall-booking.dto';
import { HallBookingService } from './hall-booking.service';

@ApiTags('hall booking')
@Controller('hall-booking')
export class HallBookingController {
  constructor(private readonly hallBookingService: HallBookingService) {}

  @Post()
  @ApiResponse({
    type: HallBookingDTO,
  })
  async create(
    @Body() createHallBookingDTO: CreateHallBookingDTO,
  ): Promise<HallBookingDTO> {
    return this.hallBookingService.create(createHallBookingDTO);
  }

  @Get()
  @ApiResponse({
    type: [HallBookingDTO],
  })
  async findAll(): Promise<HallBookingDTO[]> {
    return this.hallBookingService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [HallBookingDTO],
  })
  async search(
    @Query() filterHallBookingDTO: FilterHallBookingDTO,
  ): Promise<HallBookingDTO[]> {
    return this.hallBookingService.findByFilter(filterHallBookingDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: FilterHallBookingDTO,
  })
  findOne(@Param('id') id: string): Promise<HallBookingDTO> {
    return this.hallBookingService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: HallBookingDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateHallBookingDTO: UpdateHallBookingDTO,
  ): Promise<HallBookingDTO> {
    return this.hallBookingService.update(id, updateHallBookingDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.hallBookingService.remove(id);
  }
}
