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
  CreateIboardtisementDTO,
  FilterIboardtisementDTO,
  IboardtisementDTO,
  UpdateIboardtisementDTO,
} from './iboardtisement.dto';
import { IboardtisementService } from './iboardtisement.service';

@ApiTags('iboardtisement')
@Controller('iboardtisement')
export class IboardtisementController {
  constructor(private readonly iboardtisementService: IboardtisementService) {}

  @Post()
  @ApiResponse({
    type: IboardtisementDTO,
  })
  async create(
    @Body() createIboardtisementDTO: CreateIboardtisementDTO,
  ): Promise<IboardtisementDTO> {
    return this.iboardtisementService.create(createIboardtisementDTO);
  }

  @Get()
  @ApiResponse({
    type: [IboardtisementDTO],
  })
  async findAll(): Promise<IboardtisementDTO[]> {
    return this.iboardtisementService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [IboardtisementDTO],
  })
  async search(
    @Query() filterIboardtisementDTO: FilterIboardtisementDTO,
  ): Promise<IboardtisementDTO[]> {
    return this.iboardtisementService.findByFilter(filterIboardtisementDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: IboardtisementDTO,
  })
  findOne(@Param('id') id: string): Promise<IboardtisementDTO> {
    return this.iboardtisementService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: IboardtisementDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateIboardtisementDTO: UpdateIboardtisementDTO,
  ): Promise<IboardtisementDTO> {
    return this.iboardtisementService.update(id, updateIboardtisementDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.iboardtisementService.remove(id);
  }
}
