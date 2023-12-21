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
  CreateToDoDTO,
  FilterToDoDTO,
  ToDoDTO,
  UpdateToDoDTO,
} from './to-do.dto';
import { ToDoService } from './to-do.service';

@ApiTags('to do')
@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  @ApiResponse({
    type: ToDoDTO,
  })
  async create(@Body() createToDoDTO: CreateToDoDTO): Promise<ToDoDTO> {
    return this.toDoService.create(createToDoDTO);
  }

  @Get()
  @ApiResponse({
    type: [ToDoDTO],
  })
  async findAll(): Promise<ToDoDTO[]> {
    return this.toDoService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [ToDoDTO],
  })
  async search(@Query() filterToDoDTO: FilterToDoDTO): Promise<ToDoDTO[]> {
    return this.toDoService.findByFilter(filterToDoDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: ToDoDTO,
  })
  findOne(@Param('id') id: string): Promise<ToDoDTO> {
    return this.toDoService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ToDoDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateToDoDTO: UpdateToDoDTO,
  ): Promise<ToDoDTO> {
    return this.toDoService.update(id, updateToDoDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.toDoService.remove(id);
  }
}
