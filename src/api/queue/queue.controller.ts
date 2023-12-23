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
  CreateQueueDTO,
  FilterQueueDTO,
  QueueDTO,
  UpdateQueueDTO,
} from './queue.dto';
import { QueueService } from './queue.service';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  constructor(private readonly serviceQueue: QueueService) {}

  @Post()
  @ApiResponse({
    type: QueueDTO,
  })
  async create(@Body() createQueueDTO: CreateQueueDTO): Promise<QueueDTO> {
    return this.serviceQueue.create(createQueueDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [QueueDTO],
  })
  async findAll(): Promise<QueueDTO[]> {
    return this.serviceQueue.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [QueueDTO],
  })
  async search(@Query() filterQueueDTO: FilterQueueDTO): Promise<QueueDTO[]> {
    return this.serviceQueue.findByFilter(filterQueueDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: QueueDTO,
  })
  findOne(@Param('id') id: string): Promise<QueueDTO> {
    return this.serviceQueue.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: QueueDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateQueueDTO: UpdateQueueDTO,
  ): Promise<QueueDTO> {
    return this.serviceQueue.update(id, updateQueueDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceQueue.remove(id);
  }
}
