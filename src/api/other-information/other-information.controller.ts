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
  CreateOtherInformationDTO,
  FilterOtherInformationDTO,
  OtherInformationDTO,
  UpdateOtherInformationDTO,
} from './other-information.dto';
import { OtherInformationService } from './other-information.service';

@ApiTags('other information')
@Controller('other-information')
export class OtherInformationController {
  constructor(
    private readonly otherInformationService: OtherInformationService,
  ) {}

  @Post()
  @ApiResponse({
    type: OtherInformationDTO,
  })
  async create(
    @Body() createOtherInformationDTO: CreateOtherInformationDTO,
  ): Promise<OtherInformationDTO> {
    return this.otherInformationService.create(createOtherInformationDTO);
  }

  @Get()
  @ApiResponse({
    type: [OtherInformationDTO],
  })
  async findAll(): Promise<OtherInformationDTO[]> {
    return this.otherInformationService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [OtherInformationDTO],
  })
  async search(
    @Query() filterOtherInformationDTO: FilterOtherInformationDTO,
  ): Promise<OtherInformationDTO[]> {
    return this.otherInformationService.findByFilter(filterOtherInformationDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: OtherInformationDTO,
  })
  findOne(@Param('id') id: string): Promise<OtherInformationDTO> {
    return this.otherInformationService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: OtherInformationDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOtherInformationDTO: UpdateOtherInformationDTO,
  ): Promise<OtherInformationDTO> {
    return this.otherInformationService.update(id, updateOtherInformationDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.otherInformationService.remove(id);
  }
}
