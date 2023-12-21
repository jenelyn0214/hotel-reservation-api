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
  CreateRenewRequestDTO,
  FilterRenewRequestDTO,
  RenewRequestDTO,
  UpdateRenewRequestDTO,
} from './renew-request.dto';
import { RenewRequestService } from './renew-request.service';

@ApiTags('renew request')
@Controller('renew-request')
export class RenewRequestController {
  constructor(private readonly renewRequestService: RenewRequestService) {}

  @Post()
  @ApiResponse({
    type: RenewRequestDTO,
  })
  async create(
    @Body() createRenewRequestDTO: CreateRenewRequestDTO,
  ): Promise<RenewRequestDTO> {
    return this.renewRequestService.create(createRenewRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [RenewRequestDTO],
  })
  async findAll(): Promise<RenewRequestDTO[]> {
    return this.renewRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [RenewRequestDTO],
  })
  async search(
    @Query() filterRenewRequestDTO: FilterRenewRequestDTO,
  ): Promise<RenewRequestDTO[]> {
    return this.renewRequestService.findByFilter(filterRenewRequestDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [RenewRequestDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<RenewRequestDTO[]> {
    return this.renewRequestService.getRequestsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: RenewRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<RenewRequestDTO> {
    return this.renewRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RenewRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRenewRequestDTO: UpdateRenewRequestDTO,
  ): Promise<RenewRequestDTO> {
    return this.renewRequestService.update(id, updateRenewRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.renewRequestService.remove(id);
  }
}
