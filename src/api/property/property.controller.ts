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
  CreatePropertyDTO,
  FilterPropertyDTO,
  PropertyDTO,
  UpdatePropertyDTO,
} from './property.dto';
import { PropertyService } from './property.service';

@ApiTags('property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiResponse({
    type: PropertyDTO,
  })
  async create(
    @Body() createPropertyDTO: CreatePropertyDTO,
  ): Promise<PropertyDTO> {
    return this.propertyService.create(createPropertyDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [PropertyDTO],
  })
  async findAll(): Promise<PropertyDTO[]> {
    return this.propertyService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [PropertyDTO],
  })
  async search(
    @Query() filterPropertyDTO: FilterPropertyDTO,
  ): Promise<PropertyDTO[]> {
    return this.propertyService.findByFilter(filterPropertyDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [PropertyDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<PropertyDTO[]> {
    return this.propertyService.getPropertyByPropertyOwner(userId);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: PropertyDTO,
  })
  findOne(@Param('id') id: string): Promise<PropertyDTO> {
    return this.propertyService.findOne(id);
  }

  @Public()
  @Get('slug/:slug')
  @ApiResponse({
    type: PropertyDTO,
  })
  findSlug(@Param('slug') slug: string): Promise<PropertyDTO> {
    return this.propertyService.findSlug(slug);
  }

  @Patch(':id')
  @ApiResponse({
    type: PropertyDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDTO: UpdatePropertyDTO,
  ): Promise<PropertyDTO> {
    return this.propertyService.update(id, updatePropertyDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.propertyService.remove(id);
  }
}
