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
  CreateServiceItemDTO,
  CreateServiceReviewDTO,
  FilterServiceDTO,
  ServiceDTO,
  ServiceItemDTO,
  ServiceReviewDTO,
  UpdateServiceDTO,
  UpdateServiceItemDTO,
  UpdateServiceReviewDTO,
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

  @Public()
  @Get('slug/:slug')
  @ApiResponse({
    type: ServiceDTO,
  })
  findSlug(@Param('slug') slug: string): Promise<ServiceDTO> {
    return this.serviceService.findSlug(slug);
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

  @Post(':id/item')
  @ApiResponse({
    type: [ServiceItemDTO],
  })
  async createServiceItem(
    @Param('id') id: string,
    @Body() createServiceItemDTO: CreateServiceItemDTO,
  ): Promise<ServiceItemDTO[]> {
    return this.serviceService.createServiceItem(id, createServiceItemDTO);
  }

  @Patch(':id/item/:itemId')
  @ApiResponse({
    type: [ServiceItemDTO],
  })
  async updateServiceItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() updateServiceItemDTO: UpdateServiceItemDTO,
  ): Promise<ServiceItemDTO[]> {
    return this.serviceService.updateServiceItem(
      id,
      itemId,
      updateServiceItemDTO,
    );
  }

  @Delete(':id/item/:itemId')
  @ApiResponse({
    type: Boolean,
  })
  async deleteServiceItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ): Promise<ServiceItemDTO[]> {
    return this.serviceService.deleteServiceItem(id, itemId);
  }

  @Public()
  @Get(':id/reviews')
  @ApiResponse({
    type: [ServiceReviewDTO],
  })
  async getServiceReview(@Param('id') id: string): Promise<ServiceReviewDTO[]> {
    return this.serviceService.getServiceReview(id);
  }

  @Post(':id/reviews')
  @ApiResponse({
    type: [ServiceReviewDTO],
  })
  async createServiceReview(
    @Param('id') id: string,
    @Body() createServiceReviewDTO: CreateServiceReviewDTO,
  ): Promise<ServiceReviewDTO[]> {
    return this.serviceService.createServiceReview(id, createServiceReviewDTO);
  }

  @Patch(':id/reviews/:reviewId')
  @ApiResponse({
    type: [ServiceReviewDTO],
  })
  async updateServiceReview(
    @Param('id') id: string,
    @Param('reviewId') itemId: string,
    @Body() updateServiceReviewDTO: UpdateServiceReviewDTO,
  ): Promise<ServiceReviewDTO[]> {
    return this.serviceService.updateServiceReview(
      id,
      itemId,
      updateServiceReviewDTO,
    );
  }

  @Delete(':id/reviews/:reviewId')
  @ApiResponse({
    type: [ServiceReviewDTO],
  })
  async deleteServiceReview(
    @Param('id') id: string,
    @Param('reviewId') itemId: string,
  ): Promise<ServiceReviewDTO[]> {
    return this.serviceService.deleteServiceReview(id, itemId);
  }
}
