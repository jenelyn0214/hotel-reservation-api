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
  CreateRoomDTO,
  FilterRoomDTO,
  RoomDTO,
  UpdateRoomDTO,
} from './room.dto';
import { RoomService } from './room.service';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly serviceRoom: RoomService) {}

  @Post()
  @ApiResponse({
    type: RoomDTO,
  })
  async create(@Body() createRoomDTO: CreateRoomDTO): Promise<RoomDTO> {
    return this.serviceRoom.create(createRoomDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [RoomDTO],
  })
  async findAll(): Promise<RoomDTO[]> {
    return this.serviceRoom.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [RoomDTO],
  })
  async search(@Query() filterRoomDTO: FilterRoomDTO): Promise<RoomDTO[]> {
    return this.serviceRoom.findByFilter(filterRoomDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: RoomDTO,
  })
  findOne(@Param('id') id: string): Promise<RoomDTO> {
    return this.serviceRoom.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RoomDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRoomDTO: UpdateRoomDTO,
  ): Promise<RoomDTO> {
    return this.serviceRoom.update(id, updateRoomDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceRoom.remove(id);
  }
}
