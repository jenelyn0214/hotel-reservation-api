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
  CreateRoomBookingDTO,
  FilterRoomBookingDTO,
  RoomBookingDTO,
  UpdateRoomBookingDTO,
} from './room-booking.dto';
import { RoomBookingService } from './room-booking.service';

@ApiTags('room booking')
@Controller('room-booking')
export class RoomBookingController {
  constructor(private readonly roomBookingService: RoomBookingService) {}

  @Post()
  @ApiResponse({
    type: RoomBookingDTO,
  })
  async create(
    @Body() createRoomBookingDTO: CreateRoomBookingDTO,
  ): Promise<RoomBookingDTO> {
    return this.roomBookingService.create(createRoomBookingDTO);
  }

  @Get()
  @ApiResponse({
    type: [RoomBookingDTO],
  })
  async findAll(): Promise<RoomBookingDTO[]> {
    return this.roomBookingService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [RoomBookingDTO],
  })
  async search(
    @Query() filterRoomBookingDTO: FilterRoomBookingDTO,
  ): Promise<RoomBookingDTO[]> {
    return this.roomBookingService.findByFilter(filterRoomBookingDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: FilterRoomBookingDTO,
  })
  findOne(@Param('id') id: string): Promise<RoomBookingDTO> {
    return this.roomBookingService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RoomBookingDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRoomBookingDTO: UpdateRoomBookingDTO,
  ): Promise<RoomBookingDTO> {
    return this.roomBookingService.update(id, updateRoomBookingDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.roomBookingService.remove(id);
  }
}
