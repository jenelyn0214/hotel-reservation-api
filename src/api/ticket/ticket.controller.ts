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
  CreateTicketCommentDTO,
  CreateTicketDTO,
  FilterTicketDTO,
  TicketCommentDTO,
  TicketDTO,
  UpdateTicketCommentDTO,
  UpdateTicketDTO,
} from './ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiResponse({
    type: TicketDTO,
  })
  async create(@Body() createTicketDTO: CreateTicketDTO): Promise<TicketDTO> {
    return this.ticketService.create(createTicketDTO);
  }

  @Get()
  @ApiResponse({
    type: [TicketDTO],
  })
  async findAll(): Promise<TicketDTO[]> {
    return this.ticketService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [TicketDTO],
  })
  async search(
    @Query() filterTicketDTO: FilterTicketDTO,
  ): Promise<TicketDTO[]> {
    return this.ticketService.findByFilter(filterTicketDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [TicketDTO],
  })
  async getRentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<TicketDTO[]> {
    return this.ticketService.getTicketsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: TicketDTO,
  })
  findOne(@Param('id') id: string): Promise<TicketDTO> {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: TicketDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTicketDTO: UpdateTicketDTO,
  ): Promise<TicketDTO> {
    return this.ticketService.update(id, updateTicketDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.ticketService.remove(id);
  }

  @Post(':id/comment')
  @ApiResponse({
    type: [TicketCommentDTO],
  })
  async createTicketComment(
    @Param('id') id: string,
    @Body() createTicketCommentDTO: CreateTicketCommentDTO,
  ): Promise<TicketCommentDTO[]> {
    return this.ticketService.createTicketComment(id, createTicketCommentDTO);
  }

  @Patch(':id/comment/:commentId')
  @ApiResponse({
    type: [TicketCommentDTO],
  })
  async updateTicketComment(
    @Param('id') id: string,
    @Param('commentId') itemId: string,
    @Body() updateTicketCommentDTO: UpdateTicketCommentDTO,
  ): Promise<TicketCommentDTO[]> {
    return this.ticketService.updateTicketComment(
      id,
      itemId,
      updateTicketCommentDTO,
    );
  }

  @Delete(':id/comment/:commentId')
  @ApiResponse({
    type: [TicketCommentDTO],
  })
  async deleteTicketComment(
    @Param('id') id: string,
    @Param('commentId') itemId: string,
  ): Promise<TicketCommentDTO[]> {
    return this.ticketService.deleteTicketComment(id, itemId);
  }
}
