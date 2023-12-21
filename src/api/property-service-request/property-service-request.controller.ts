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
  CreatePropertyServiceRequestDTO,
  FilterPropertyServiceRequestDTO,
  PropertyServiceRequestsDTO,
  PropertyServiceRequestsWithLogsDTO,
  UpdatePropertyServiceRequestDTO,
} from './property-service-request.dto';
import { PropertyServiceRequestService } from './property-service-request.service';

@ApiTags('property service request')
@Controller('property-service-request')
export class PropertyServiceRequestController {
  constructor(
    private readonly propertyServiceRequestService: PropertyServiceRequestService,
  ) {}

  @Post()
  @ApiResponse({
    type: PropertyServiceRequestsDTO,
  })
  async create(
    @Body() createPropertyServiceRequestDTO: CreatePropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO> {
    return this.propertyServiceRequestService.create(
      createPropertyServiceRequestDTO,
    );
  }

  @Get()
  @ApiResponse({
    type: [PropertyServiceRequestsDTO],
  })
  async findAll(): Promise<PropertyServiceRequestsDTO[]> {
    return this.propertyServiceRequestService.findAll();
  }

  @Get('latest')
  @ApiResponse({
    type: [PropertyServiceRequestsWithLogsDTO],
  })
  async findAllWithLogs(
    @Query() filterPropertyServiceRequestDTO: FilterPropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsWithLogsDTO[]> {
    return this.propertyServiceRequestService.findAllWithLogs(
      filterPropertyServiceRequestDTO,
    );
  }

  @Get('search')
  @ApiResponse({
    type: [PropertyServiceRequestsDTO],
  })
  async search(
    @Query() filterPropertyServiceRequestDTO: FilterPropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO[]> {
    return this.propertyServiceRequestService.findByFilter(
      filterPropertyServiceRequestDTO,
    );
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [PropertyServiceRequestsDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<PropertyServiceRequestsDTO[]> {
    return this.propertyServiceRequestService.getPropertyServiceRequestByPropertyOwner(
      userId,
    );
  }

  @Get(':id')
  @ApiResponse({
    type: PropertyServiceRequestsWithLogsDTO,
  })
  findOne(
    @Param('id') id: string,
  ): Promise<PropertyServiceRequestsWithLogsDTO> {
    return this.propertyServiceRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: PropertyServiceRequestsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyServiceRequestDTO: UpdatePropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO> {
    return this.propertyServiceRequestService.update(
      id,
      updatePropertyServiceRequestDTO,
    );
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.propertyServiceRequestService.remove(id);
  }
}
