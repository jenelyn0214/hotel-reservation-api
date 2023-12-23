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
  CreateHallDTO,
  FilterHallDTO,
  HallDTO,
  UpdateHallDTO,
} from './hall.dto';
import { HallService } from './hall.service';

@ApiTags('hall')
@Controller('hall')
export class HallController {
  constructor(private readonly serviceHall: HallService) {}

  @Post()
  @ApiResponse({
    type: HallDTO,
  })
  async create(@Body() createHallDTO: CreateHallDTO): Promise<HallDTO> {
    return this.serviceHall.create(createHallDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [HallDTO],
  })
  async findAll(): Promise<HallDTO[]> {
    return this.serviceHall.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [HallDTO],
  })
  async search(@Query() filterHallDTO: FilterHallDTO): Promise<HallDTO[]> {
    return this.serviceHall.findByFilter(filterHallDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: HallDTO,
  })
  findOne(@Param('id') id: string): Promise<HallDTO> {
    return this.serviceHall.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: HallDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateHallDTO: UpdateHallDTO,
  ): Promise<HallDTO> {
    return this.serviceHall.update(id, updateHallDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceHall.remove(id);
  }
}
