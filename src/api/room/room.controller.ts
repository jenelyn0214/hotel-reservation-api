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
  CreateRoomReviewDTO,
  FilterRoomDTO,
  RoomDTO,
  RoomReviewDTO,
  UpdateRoomDTO,
  UpdateRoomReviewDTO,
} from './room.dto';
import { RoomService } from './room.service';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiResponse({
    type: RoomDTO,
  })
  async create(@Body() createRoomDTO: CreateRoomDTO): Promise<RoomDTO> {
    return this.roomService.create(createRoomDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [RoomDTO],
  })
  async findAll(): Promise<RoomDTO[]> {
    return this.roomService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [RoomDTO],
  })
  async search(@Query() filterRoomDTO: FilterRoomDTO): Promise<RoomDTO[]> {
    return this.roomService.findByFilter(filterRoomDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [RoomDTO],
  })
  async getRoomsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<RoomDTO[]> {
    return this.roomService.getRoomsByPropertyOwner(userId);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: RoomDTO,
  })
  findOne(@Param('id') id: string): Promise<RoomDTO> {
    return this.roomService.findOne(id);
  }

  @Public()
  @Get('slug/:slug')
  @ApiResponse({
    type: RoomDTO,
  })
  findSlug(@Param('slug') slug: string): Promise<RoomDTO> {
    return this.roomService.findSlug(slug);
  }

  @Public()
  @Patch(':id')
  @ApiResponse({
    type: RoomDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRoomDTO: UpdateRoomDTO,
  ): Promise<RoomDTO> {
    return this.roomService.update(id, updateRoomDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.roomService.remove(id);
  }

  @Public()
  @Get(':id/reviews')
  @ApiResponse({
    type: [RoomReviewDTO],
  })
  async getRoomReview(@Param('id') id: string): Promise<RoomReviewDTO[]> {
    return this.roomService.getRoomReview(id);
  }

  @Post(':id/reviews')
  @ApiResponse({
    type: [RoomReviewDTO],
  })
  async createRoomReview(
    @Param('id') id: string,
    @Body() createRoomReviewDTO: CreateRoomReviewDTO,
  ): Promise<RoomReviewDTO[]> {
    return this.roomService.createRoomReview(id, createRoomReviewDTO);
  }

  @Patch(':id/reviews/:reviewId')
  @ApiResponse({
    type: [RoomReviewDTO],
  })
  async updateRoomReview(
    @Param('id') id: string,
    @Param('reviewId') itemId: string,
    @Body() updateRoomReviewDTO: UpdateRoomReviewDTO,
  ): Promise<RoomReviewDTO[]> {
    return this.roomService.updateRoomReview(id, itemId, updateRoomReviewDTO);
  }

  @Delete(':id/reviews/:reviewId')
  @ApiResponse({
    type: [RoomReviewDTO],
  })
  async deleteRoomReview(
    @Param('id') id: string,
    @Param('reviewId') itemId: string,
  ): Promise<RoomReviewDTO[]> {
    return this.roomService.deleteRoomReview(id, itemId);
  }
}
