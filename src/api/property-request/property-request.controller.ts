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
  CreatePropertyRequestDTO,
  FilterPropertyRequestDTO,
  PropertyRequestsDTO,
  PropertyRequestsWithLogsDTO,
  UpdatePropertyRequestDTO,
} from './property-request.dto';
import { PropertyRequestService } from './property-request.service';

@ApiTags('property request')
@Controller('property-request')
export class PropertyRequestController {
  constructor(
    private readonly propertyRequestService: PropertyRequestService,
  ) {}

  @Post()
  @ApiResponse({
    type: PropertyRequestsDTO,
  })
  async create(
    @Body() createPropertyRequestDTO: CreatePropertyRequestDTO,
  ): Promise<PropertyRequestsDTO> {
    return this.propertyRequestService.create(createPropertyRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [PropertyRequestsDTO],
  })
  async findAll(): Promise<PropertyRequestsDTO[]> {
    return this.propertyRequestService.findAll();
  }

  @Get('latest')
  @ApiResponse({
    type: [PropertyRequestsWithLogsDTO],
  })
  async findAllWithLogs(): Promise<PropertyRequestsWithLogsDTO[]> {
    return this.propertyRequestService.findAllWithLogs();
  }

  @Get('search')
  @ApiResponse({
    type: [PropertyRequestsDTO],
  })
  async search(
    @Query() filterPropertyRequestDTO: FilterPropertyRequestDTO,
  ): Promise<PropertyRequestsDTO[]> {
    return this.propertyRequestService.findByFilter(filterPropertyRequestDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: PropertyRequestsWithLogsDTO,
  })
  findOne(@Param('id') id: string): Promise<PropertyRequestsWithLogsDTO> {
    return this.propertyRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: PropertyRequestsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyRequestDTO: UpdatePropertyRequestDTO,
  ): Promise<PropertyRequestsDTO> {
    return this.propertyRequestService.update(id, updatePropertyRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.propertyRequestService.remove(id);
  }
}
