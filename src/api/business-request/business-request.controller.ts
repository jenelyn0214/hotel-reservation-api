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
  BusinessRequestsDTO,
  CreateBusinessRequestDTO,
  FilterBusinessRequestDTO,
  UpdateBusinessRequestDTO,
} from './business-request.dto';
import { BusinessRequestService } from './business-request.service';

@ApiTags('business request')
@Controller('business-request')
export class BusinessRequestController {
  constructor(
    private readonly businessRequestService: BusinessRequestService,
  ) {}

  @Post()
  @ApiResponse({
    type: BusinessRequestsDTO,
  })
  async create(
    @Body() createBusinessRequestDTO: CreateBusinessRequestDTO,
  ): Promise<BusinessRequestsDTO> {
    return this.businessRequestService.create(createBusinessRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [BusinessRequestsDTO],
  })
  async findAll(): Promise<BusinessRequestsDTO[]> {
    return this.businessRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [BusinessRequestsDTO],
  })
  async search(
    @Query() filterBusinessRequestDTO: FilterBusinessRequestDTO,
  ): Promise<BusinessRequestsDTO[]> {
    return this.businessRequestService.findByFilter(filterBusinessRequestDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: BusinessRequestsDTO,
  })
  findOne(@Param('id') id: string): Promise<BusinessRequestsDTO> {
    return this.businessRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: BusinessRequestsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateBusinessRequestDTO: UpdateBusinessRequestDTO,
  ): Promise<BusinessRequestsDTO> {
    return this.businessRequestService.update(id, updateBusinessRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.businessRequestService.remove(id);
  }
}
