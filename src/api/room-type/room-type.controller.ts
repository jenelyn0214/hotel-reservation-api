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
  CreateRoomTypeDTO,
  FilterRoomTypeDTO,
  RoomTypeDTO,
  UpdateRoomTypeDTO,
} from './room-type.dto';
import { RoomTypeService } from './room-type.service';

@ApiTags('room type')
@Controller('room-type')
export class RoomTypeController {
  constructor(private readonly serviceRoomType: RoomTypeService) {}

  @Post()
  @ApiResponse({
    type: RoomTypeDTO,
  })
  async create(
    @Body() createRoomTypeDTO: CreateRoomTypeDTO,
  ): Promise<RoomTypeDTO> {
    return this.serviceRoomType.create(createRoomTypeDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [RoomTypeDTO],
  })
  async findAll(): Promise<RoomTypeDTO[]> {
    return this.serviceRoomType.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [RoomTypeDTO],
  })
  async search(
    @Query() filterRoomTypeDTO: FilterRoomTypeDTO,
  ): Promise<RoomTypeDTO[]> {
    return this.serviceRoomType.findByFilter(filterRoomTypeDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: RoomTypeDTO,
  })
  findOne(@Param('id') id: string): Promise<RoomTypeDTO> {
    return this.serviceRoomType.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RoomTypeDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRoomTypeDTO: UpdateRoomTypeDTO,
  ): Promise<RoomTypeDTO> {
    return this.serviceRoomType.update(id, updateRoomTypeDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceRoomType.remove(id);
  }
}
