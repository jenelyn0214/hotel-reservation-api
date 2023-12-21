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
  CreateDemoDTO,
  DemoDTO,
  FilterDemoDTO,
  UpdateDemoDTO,
} from './demo.dto';
import { DemoService } from './demo.service';

@ApiTags('demo')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post()
  @ApiResponse({
    type: DemoDTO,
  })
  async create(@Body() createDemoDTO: CreateDemoDTO): Promise<DemoDTO> {
    return this.demoService.create(createDemoDTO);
  }

  @Get()
  @ApiResponse({
    type: [DemoDTO],
  })
  async findAll(): Promise<DemoDTO[]> {
    return this.demoService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [DemoDTO],
  })
  async search(@Query() filterDemoDTO: FilterDemoDTO): Promise<DemoDTO[]> {
    return this.demoService.findByFilter(filterDemoDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: DemoDTO,
  })
  findOne(@Param('id') id: string): Promise<DemoDTO> {
    return this.demoService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: DemoDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDemoDTO: UpdateDemoDTO,
  ): Promise<DemoDTO> {
    return this.demoService.update(id, updateDemoDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.demoService.remove(id);
  }
}
