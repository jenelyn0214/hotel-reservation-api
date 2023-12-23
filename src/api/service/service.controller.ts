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
  CreateServiceDTO,
  FilterServiceDTO,
  ServiceDTO,
  UpdateServiceDTO,
} from './service.dto';
import { ServiceService } from './service.service';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiResponse({
    type: ServiceDTO,
  })
  async create(
    @Body() createServiceDTO: CreateServiceDTO,
  ): Promise<ServiceDTO> {
    return this.serviceService.create(createServiceDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [ServiceDTO],
  })
  async findAll(): Promise<ServiceDTO[]> {
    return this.serviceService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [ServiceDTO],
  })
  async search(
    @Query() filterServiceDTO: FilterServiceDTO,
  ): Promise<ServiceDTO[]> {
    return this.serviceService.findByFilter(filterServiceDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: ServiceDTO,
  })
  findOne(@Param('id') id: string): Promise<ServiceDTO> {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ServiceDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDTO: UpdateServiceDTO,
  ): Promise<ServiceDTO> {
    return this.serviceService.update(id, updateServiceDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceService.remove(id);
  }
}
