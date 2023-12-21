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
  CreatePropertyServiceMemberDTO,
  FilterPropertyServiceMemberDTO,
  PropertyServiceMemberDTO,
  UpdatePropertyServiceMemberDTO,
} from './property-service-member.dto';
import { PropertyServiceMemberService } from './property-service-member.service';

@ApiTags('property service member')
@Controller('property-service-member')
export class PropertyServiceMemberController {
  constructor(
    private readonly propertyServiceMemberService: PropertyServiceMemberService,
  ) {}

  @Post()
  @ApiResponse({
    type: PropertyServiceMemberDTO,
  })
  async create(
    @Body() createPropertyServiceMemberDTO: CreatePropertyServiceMemberDTO,
  ): Promise<PropertyServiceMemberDTO> {
    return this.propertyServiceMemberService.create(
      createPropertyServiceMemberDTO,
    );
  }

  @Get()
  @ApiResponse({
    type: [PropertyServiceMemberDTO],
  })
  async findAll(): Promise<PropertyServiceMemberDTO[]> {
    return this.propertyServiceMemberService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [PropertyServiceMemberDTO],
  })
  async search(
    @Query() filterPropertyServiceMemberDTO: FilterPropertyServiceMemberDTO,
  ): Promise<PropertyServiceMemberDTO[]> {
    return this.propertyServiceMemberService.findByFilter(
      filterPropertyServiceMemberDTO,
    );
  }

  @Get('property-owner/:userId')
  @ApiResponse({
    type: [PropertyServiceMemberDTO],
  })
  async getPaymentsByPropertyOwner(
    @Param('userId') userId: string,
  ): Promise<PropertyServiceMemberDTO[]> {
    return this.propertyServiceMemberService.getPropertyServiceMemberByPropertyOwner(
      userId,
    );
  }

  @Get(':id')
  @ApiResponse({
    type: PropertyServiceMemberDTO,
  })
  findOne(@Param('id') id: string): Promise<PropertyServiceMemberDTO> {
    return this.propertyServiceMemberService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: PropertyServiceMemberDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePropertyServiceMemberDTO: UpdatePropertyServiceMemberDTO,
  ): Promise<PropertyServiceMemberDTO> {
    return this.propertyServiceMemberService.update(
      id,
      updatePropertyServiceMemberDTO,
    );
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.propertyServiceMemberService.remove(id);
  }
}
