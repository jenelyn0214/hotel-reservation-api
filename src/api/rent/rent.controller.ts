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
  CreateRentDTO,
  FilterRentDTO,
  RentDTO,
  UpdateRentDTO,
} from './rent.dto';
import { RentService } from './rent.service';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  @ApiResponse({
    type: RentDTO,
  })
  async create(@Body() createRentDTO: CreateRentDTO): Promise<RentDTO> {
    return this.rentService.create(createRentDTO);
  }

  @Get()
  @ApiResponse({
    type: [RentDTO],
  })
  async findAll(): Promise<RentDTO[]> {
    return this.rentService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [RentDTO],
  })
  async search(@Query() filterRentDTO: FilterRentDTO): Promise<RentDTO[]> {
    return this.rentService.findByFilter(filterRentDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [RentDTO],
  })
  async getRentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<RentDTO[]> {
    return this.rentService.getRentsByPropertyOwner(userId);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: RentDTO,
  })
  findOne(@Param('id') id: string): Promise<RentDTO> {
    return this.rentService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiResponse({
    type: RentDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRentDTO: UpdateRentDTO,
  ): Promise<RentDTO> {
    return this.rentService.update(id, updateRentDTO);
  }

  @Public()
  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.rentService.remove(id);
  }
}
