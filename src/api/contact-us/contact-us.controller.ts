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
  ContactUsDTO,
  CreateContactUsDTO,
  FilterContactUsDTO,
  UpdateContactUsDTO,
} from './contact-us.dto';
import { ContactUsService } from './contact-us.service';

@ApiTags('contact us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Public()
  @Post()
  @ApiResponse({
    type: ContactUsDTO,
  })
  async create(
    @Body() createContactUsDTO: CreateContactUsDTO,
  ): Promise<ContactUsDTO> {
    return this.contactUsService.create(createContactUsDTO);
  }

  @Get()
  @ApiResponse({
    type: [ContactUsDTO],
  })
  async findAll(): Promise<ContactUsDTO[]> {
    return this.contactUsService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [ContactUsDTO],
  })
  async search(
    @Query() filterContactUsDTO: FilterContactUsDTO,
  ): Promise<ContactUsDTO[]> {
    return this.contactUsService.findByFilter(filterContactUsDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: ContactUsDTO,
  })
  findOne(@Param('id') id: string): Promise<ContactUsDTO> {
    return this.contactUsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ContactUsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateContactUsDTO: UpdateContactUsDTO,
  ): Promise<ContactUsDTO> {
    return this.contactUsService.update(id, updateContactUsDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.contactUsService.remove(id);
  }
}
