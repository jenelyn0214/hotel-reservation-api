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
  ChatDTO,
  ChatItemDTO,
  CreateChatDTO,
  CreateChatItemDTO,
  FilterChatDTO,
  UpdateChatDTO,
  UpdateChatItemDTO,
} from './chat.dto';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiResponse({
    type: ChatDTO,
  })
  async create(@Body() createChatDTO: CreateChatDTO): Promise<ChatDTO> {
    return this.chatService.create(createChatDTO);
  }

  @Get()
  @ApiResponse({
    type: [ChatDTO],
  })
  async findAll(): Promise<ChatDTO[]> {
    return this.chatService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [ChatDTO],
  })
  async search(@Query() filterChatDTO: FilterChatDTO): Promise<ChatDTO[]> {
    return this.chatService.findByFilter(filterChatDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: ChatDTO,
  })
  findOne(@Param('id') id: string): Promise<ChatDTO> {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ChatDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateChatDTO: UpdateChatDTO,
  ): Promise<ChatDTO> {
    return this.chatService.update(id, updateChatDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.chatService.remove(id);
  }

  @Post(':id/message')
  @ApiResponse({
    type: [ChatItemDTO],
  })
  async createChatItem(
    @Param('id') id: string,
    @Body() createChatItemDTO: CreateChatItemDTO,
  ): Promise<ChatItemDTO[]> {
    return this.chatService.createChatItem(id, createChatItemDTO);
  }

  @Patch(':id/message/:messageId')
  @ApiResponse({
    type: [ChatItemDTO],
  })
  async updateChatItem(
    @Param('id') id: string,
    @Param('messageId') itemId: string,
    @Body() updateChatItemDTO: UpdateChatItemDTO,
  ): Promise<ChatItemDTO[]> {
    return this.chatService.updateChatItem(id, itemId, updateChatItemDTO);
  }

  @Delete(':id/message/:messageId')
  @ApiResponse({
    type: [ChatItemDTO],
  })
  async deleteChatItem(
    @Param('id') id: string,
    @Param('messageId') itemId: string,
  ): Promise<ChatItemDTO[]> {
    return this.chatService.deleteChatItem(id, itemId);
  }
}
