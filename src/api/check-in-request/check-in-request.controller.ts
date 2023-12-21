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
  CheckInRequestDTO,
  CreateCheckInRequestDTO,
  FilterCheckInRequestDTO,
  UpdateCheckInRequestDTO,
} from './check-in-request.dto';
import { CheckInRequestService } from './check-in-request.service';

@ApiTags('check-in request')
@Controller('check-in-request')
export class CheckInRequestController {
  constructor(private readonly checkInRequestService: CheckInRequestService) {}

  @Post()
  @ApiResponse({
    type: CheckInRequestDTO,
  })
  async create(
    @Body() createCheckInRequestDTO: CreateCheckInRequestDTO,
  ): Promise<CheckInRequestDTO> {
    return this.checkInRequestService.create(createCheckInRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [CheckInRequestDTO],
  })
  async findAll(): Promise<CheckInRequestDTO[]> {
    return this.checkInRequestService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [CheckInRequestDTO],
  })
  async search(
    @Query() filterCheckInRequestDTO: FilterCheckInRequestDTO,
  ): Promise<CheckInRequestDTO[]> {
    return this.checkInRequestService.findByFilter(filterCheckInRequestDTO);
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [CheckInRequestDTO],
  })
  async getRequestsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<CheckInRequestDTO[]> {
    return this.checkInRequestService.getRequestsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: CheckInRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<CheckInRequestDTO> {
    return this.checkInRequestService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiResponse({
    type: CheckInRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCheckInRequestDTO: UpdateCheckInRequestDTO,
  ): Promise<CheckInRequestDTO> {
    return this.checkInRequestService.update(id, updateCheckInRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.checkInRequestService.remove(id);
  }
}
