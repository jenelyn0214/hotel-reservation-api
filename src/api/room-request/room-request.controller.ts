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
  CreateRoomRequestDTO,
  FilterRoomRequestDTO,
  RoomRequestsDTO,
  RoomRequestsWithLogsDTO,
  UpdateRoomRequestDTO,
} from './room-request.dto';
import { RoomRequestService } from './room-request.service';

@ApiTags('room request')
@Controller('room-request')
export class RoomRequestController {
  constructor(private readonly roomRequestService: RoomRequestService) {}

  @Post()
  @ApiResponse({
    type: RoomRequestsDTO,
  })
  async create(
    @Body() createRoomRequestDTO: CreateRoomRequestDTO,
  ): Promise<RoomRequestsDTO> {
    return this.roomRequestService.create(createRoomRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [RoomRequestsDTO],
  })
  async findAll(): Promise<RoomRequestsDTO[]> {
    return this.roomRequestService.findAll();
  }

  @Get('latest')
  @ApiResponse({
    type: [RoomRequestsWithLogsDTO],
  })
  async findAllWithLogs(
    @Query() filterRoomRequestDTO: FilterRoomRequestDTO,
  ): Promise<RoomRequestsWithLogsDTO[]> {
    return this.roomRequestService.findAllWithLogs(filterRoomRequestDTO);
  }

  @Get('search')
  @ApiResponse({
    type: [RoomRequestsDTO],
  })
  async search(
    @Query() filterRoomRequestDTO: FilterRoomRequestDTO,
  ): Promise<RoomRequestsDTO[]> {
    return this.roomRequestService.findByFilter(filterRoomRequestDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: RoomRequestsWithLogsDTO,
  })
  findOne(@Param('id') id: string): Promise<RoomRequestsWithLogsDTO> {
    return this.roomRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RoomRequestsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRoomRequestDTO: UpdateRoomRequestDTO,
  ): Promise<RoomRequestsDTO> {
    return this.roomRequestService.update(id, updateRoomRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.roomRequestService.remove(id);
  }
}
