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
  BusinessDTO,
  CreateBusinessDTO,
  FilterBusinessDTO,
  UpdateBusinessDTO,
} from './business.dto';
import { BusinessService } from './business.service';

@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiResponse({
    type: BusinessDTO,
  })
  async create(
    @Body() createBusinessDTO: CreateBusinessDTO,
  ): Promise<BusinessDTO> {
    return this.businessService.create(createBusinessDTO);
  }

  @Get()
  @ApiResponse({
    type: [BusinessDTO],
  })
  async findAll(): Promise<BusinessDTO[]> {
    return this.businessService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [BusinessDTO],
  })
  async search(
    @Query() filterBusinessDTO: FilterBusinessDTO,
  ): Promise<BusinessDTO[]> {
    return this.businessService.findByFilter(filterBusinessDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: BusinessDTO,
  })
  findOne(@Param('id') id: string): Promise<BusinessDTO> {
    return this.businessService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiResponse({
    type: BusinessDTO,
  })
  findSlug(@Param('slug') slug: string): Promise<BusinessDTO> {
    return this.businessService.findSlug(slug);
  }

  @Patch(':id')
  @ApiResponse({
    type: BusinessDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateBusinessDTO: UpdateBusinessDTO,
  ): Promise<BusinessDTO> {
    return this.businessService.update(id, updateBusinessDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.businessService.remove(id);
  }
}
