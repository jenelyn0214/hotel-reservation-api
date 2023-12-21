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
  CancelContractRequestDTO,
  CreateCancelContractRequestDTO,
  FilterCancelContractRequestDTO,
  UpdateCancelContractRequestDTO,
} from './cancel-contract-request.dto';
import { CancelContractRequestService } from './cancel-contract-request.service';

@ApiTags('cancel contract request')
@Controller('cancel-contract-request')
export class CancelContractRequestController {
  constructor(
    private readonly cancelContractRequestService: CancelContractRequestService,
  ) {}

  @Post()
  @ApiResponse({
    type: CancelContractRequestDTO,
  })
  async create(
    @Body() createCancelContractRequestDTO: CreateCancelContractRequestDTO,
  ): Promise<CancelContractRequestDTO> {
    return this.cancelContractRequestService.create(
      createCancelContractRequestDTO,
    );
  }

  @Get()
  @ApiResponse({
    type: [CancelContractRequestDTO],
  })
  async findAll(): Promise<CancelContractRequestDTO[]> {
    return this.cancelContractRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [CancelContractRequestDTO],
  })
  async search(
    @Query() filterCancelContractRequestDTO: FilterCancelContractRequestDTO,
  ): Promise<CancelContractRequestDTO[]> {
    return this.cancelContractRequestService.findByFilter(
      filterCancelContractRequestDTO,
    );
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [CancelContractRequestDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<CancelContractRequestDTO[]> {
    return this.cancelContractRequestService.getRequestsByPropertyOwner(userId);
  }

  @Get(':id')
  @ApiResponse({
    type: CancelContractRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<CancelContractRequestDTO> {
    return this.cancelContractRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: CancelContractRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCancelContractRequestDTO: UpdateCancelContractRequestDTO,
  ): Promise<CancelContractRequestDTO> {
    return this.cancelContractRequestService.update(
      id,
      updateCancelContractRequestDTO,
    );
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.cancelContractRequestService.remove(id);
  }
}
