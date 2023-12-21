import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CompanyInformationDTO,
  CreateCompanyInformationDTO,
  UpdateCompanyInformationDTO,
} from './company-information.dto';
import { CompanyInformationService } from './company-information.service';

@ApiTags('company information')
@Controller('company-information')
export class CompanyInformationController {
  constructor(
    private readonly companyInformationService: CompanyInformationService,
  ) {}

  @Post()
  @ApiResponse({
    type: CompanyInformationDTO,
  })
  async create(
    @Body() createCompanyInformationDTO: CreateCompanyInformationDTO,
  ): Promise<CompanyInformationDTO> {
    return this.companyInformationService.create(createCompanyInformationDTO);
  }

  @Get()
  @ApiResponse({
    type: [CompanyInformationDTO],
  })
  async findAll(): Promise<CompanyInformationDTO[]> {
    return this.companyInformationService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: CompanyInformationDTO,
  })
  findOne(@Param('id') id: string): Promise<CompanyInformationDTO> {
    return this.companyInformationService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: CompanyInformationDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyInformationDTO: UpdateCompanyInformationDTO,
  ): Promise<CompanyInformationDTO> {
    return this.companyInformationService.update(
      id,
      updateCompanyInformationDTO,
    );
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.companyInformationService.remove(id);
  }
}
