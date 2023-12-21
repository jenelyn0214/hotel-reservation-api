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
  CreateTermConditionDTO,
  FilterTermConditionDTO,
  TermConditionDTO,
  UpdateTermConditionDTO,
} from './term-condition.dto';
import { TermConditionService } from './term-condition.service';

@ApiTags('terms and condition')
@Controller('term-condition')
export class TermConditionController {
  constructor(private readonly termConditionService: TermConditionService) {}

  @Post()
  @ApiResponse({
    type: TermConditionDTO,
  })
  async create(
    @Body() createTermConditionDTO: CreateTermConditionDTO,
  ): Promise<TermConditionDTO> {
    return this.termConditionService.create(createTermConditionDTO);
  }

  @Get()
  @ApiResponse({
    type: [TermConditionDTO],
  })
  async findAll(): Promise<TermConditionDTO[]> {
    return this.termConditionService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [TermConditionDTO],
  })
  async search(
    @Query() filterTermConditionDTO: FilterTermConditionDTO,
  ): Promise<TermConditionDTO[]> {
    return this.termConditionService.findByFilter(filterTermConditionDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: TermConditionDTO,
  })
  findOne(@Param('id') id: string): Promise<TermConditionDTO> {
    return this.termConditionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: TermConditionDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTermConditionDTO: UpdateTermConditionDTO,
  ): Promise<TermConditionDTO> {
    return this.termConditionService.update(id, updateTermConditionDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.termConditionService.remove(id);
  }
}
