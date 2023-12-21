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
  CreateServiceRequestDTO,
  FilterServiceRequestDTO,
  ServiceRequestsDTO,
  UpdateServiceRequestDTO,
} from './service-request.dto';
import { ServiceRequestService } from './service-request.service';

@ApiTags('service request')
@Controller('service-request')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  @ApiResponse({
    type: ServiceRequestsDTO,
  })
  async create(
    @Body() createServiceRequestDTO: CreateServiceRequestDTO,
  ): Promise<ServiceRequestsDTO> {
    return this.serviceRequestService.create(createServiceRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [ServiceRequestsDTO],
  })
  async findAll(): Promise<ServiceRequestsDTO[]> {
    return this.serviceRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [ServiceRequestsDTO],
  })
  async search(
    @Query() filterServiceRequestDTO: FilterServiceRequestDTO,
  ): Promise<ServiceRequestsDTO[]> {
    return this.serviceRequestService.findByFilter(filterServiceRequestDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: ServiceRequestsDTO,
  })
  findOne(@Param('id') id: string): Promise<ServiceRequestsDTO> {
    return this.serviceRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ServiceRequestsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateServiceRequestDTO: UpdateServiceRequestDTO,
  ): Promise<ServiceRequestsDTO> {
    return this.serviceRequestService.update(id, updateServiceRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceRequestService.remove(id);
  }
}
