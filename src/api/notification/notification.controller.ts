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
  CreateNotificationDTO,
  FilterNotificationDTO,
  NotificationDTO,
  UpdateNotificationDTO,
} from './notification.dto';
import { NotificationService } from './notification.service';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Public()
  @Post()
  @ApiResponse({
    type: NotificationDTO,
  })
  async create(
    @Body() createNotificationDTO: CreateNotificationDTO,
  ): Promise<NotificationDTO> {
    return this.notificationService.create(createNotificationDTO);
  }

  @Get()
  @ApiResponse({
    type: [NotificationDTO],
  })
  async findAll(): Promise<NotificationDTO[]> {
    return this.notificationService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [NotificationDTO],
  })
  async search(
    @Query() filterNotificationDTO: FilterNotificationDTO,
  ): Promise<NotificationDTO[]> {
    return this.notificationService.findByFilter(filterNotificationDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: NotificationDTO,
  })
  findOne(@Param('id') id: string): Promise<NotificationDTO> {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: NotificationDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDTO: UpdateNotificationDTO,
  ): Promise<NotificationDTO> {
    return this.notificationService.update(id, updateNotificationDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.notificationService.remove(id);
  }
}
