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
  CreatePropertyServiceDTO,
  FilterPropertyServiceDTO,
  PropertyServiceDTO,
  UpdatePropertyServiceDTO,
} from './property-service.dto';
import { PropertyServiceService } from './property-service.service';

@ApiTags('property service')
@Controller('property-service')
export class PropertyServiceController {
  constructor(
    private readonly propertyServiceService: PropertyServiceService,
  ) {}

  @Post()
  @ApiResponse({
    type: PropertyServiceDTO,
  })
  async create(
    @Body() createPropertyServiceDTO: CreatePropertyServiceDTO,
  ): Promise<PropertyServiceDTO> {
    return this.propertyServiceService.create(createPropertyServiceDTO);
  }

  @Get()
  @ApiResponse({
    type: [PropertyServiceDTO],
  })
  async findAll(): Promise<PropertyServiceDTO[]> {
    return this.propertyServiceService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [PropertyServiceDTO],
  })
  async search(
    @Query() filterPropertyServiceDTO: FilterPropertyServiceDTO,
  ): Promise<PropertyServiceDTO[]> {
    return this.propertyServiceService.findByFilter(filterPropertyServiceDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [PropertyServiceDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<PropertyServiceDTO[]> {
    return this.propertyServiceService.getPropertyServiceByPropertyOwner(
      userId,
    );
  }

  @Get(':id')
  @ApiResponse({
    type: PropertyServiceDTO,
  })
  findOne(@Param('id') id: string): Promise<PropertyServiceDTO> {
    return this.propertyServiceService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: PropertyServiceDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyServiceDTO: UpdatePropertyServiceDTO,
  ): Promise<PropertyServiceDTO> {
    return this.propertyServiceService.update(id, updatePropertyServiceDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.propertyServiceService.remove(id);
  }
}
