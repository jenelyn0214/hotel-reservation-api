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
  ConsumeRequestDTO,
  CreateConsumeRequestDTO,
  FilterConsumeRequestDTO,
  UpdateConsumeRequestDTO,
} from './consume-request.dto';
import { ConsumeRequestService } from './consume-request.service';

@ApiTags('consume request')
@Controller('consume-request')
export class ConsumeRequestController {
  constructor(private readonly consumeRequestService: ConsumeRequestService) {}

  @Post()
  @ApiResponse({
    type: ConsumeRequestDTO,
  })
  async create(
    @Body() createConsumeRequestDTO: CreateConsumeRequestDTO,
  ): Promise<ConsumeRequestDTO> {
    return this.consumeRequestService.create(createConsumeRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [ConsumeRequestDTO],
  })
  async findAll(): Promise<ConsumeRequestDTO[]> {
    return this.consumeRequestService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [ConsumeRequestDTO],
  })
  async search(
    @Query() filterConsumeRequestDTO: FilterConsumeRequestDTO,
  ): Promise<ConsumeRequestDTO[]> {
    return this.consumeRequestService.findByFilter(filterConsumeRequestDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [ConsumeRequestDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<ConsumeRequestDTO[]> {
    return this.consumeRequestService.getRequestsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: ConsumeRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<ConsumeRequestDTO> {
    return this.consumeRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ConsumeRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateConsumeRequestDTO: UpdateConsumeRequestDTO,
  ): Promise<ConsumeRequestDTO> {
    return this.consumeRequestService.update(id, updateConsumeRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.consumeRequestService.remove(id);
  }
}
