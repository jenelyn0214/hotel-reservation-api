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
  CreateEmergencyContactDTO,
  EmergencyContactDTO,
  FilterEmergencyContactDTO,
  UpdateEmergencyContactDTO,
} from './emergency-contact.dto';
import { EmergencyContactService } from './emergency-contact.service';

@ApiTags('emergency contact')
@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(
    private readonly emergencyContactService: EmergencyContactService,
  ) {}

  @Post()
  @ApiResponse({
    type: EmergencyContactDTO,
  })
  async create(
    @Body() createEmergencyContactDTO: CreateEmergencyContactDTO,
  ): Promise<EmergencyContactDTO> {
    return this.emergencyContactService.create(createEmergencyContactDTO);
  }

  @Get()
  @ApiResponse({
    type: [EmergencyContactDTO],
  })
  async findAll(): Promise<EmergencyContactDTO[]> {
    return this.emergencyContactService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [EmergencyContactDTO],
  })
  async search(
    @Query() filterEmergencyContactDTO: FilterEmergencyContactDTO,
  ): Promise<EmergencyContactDTO[]> {
    return this.emergencyContactService.findByFilter(filterEmergencyContactDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: EmergencyContactDTO,
  })
  findOne(@Param('id') id: string): Promise<EmergencyContactDTO> {
    return this.emergencyContactService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: EmergencyContactDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateEmergencyContactDTO: UpdateEmergencyContactDTO,
  ): Promise<EmergencyContactDTO> {
    return this.emergencyContactService.update(id, updateEmergencyContactDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.emergencyContactService.remove(id);
  }
}
