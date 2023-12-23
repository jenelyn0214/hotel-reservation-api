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
  CreateCustomerDTO,
  CustomerDTO,
  FilterCustomerDTO,
  UpdateCustomerDTO,
} from './customer.dto';
import { CustomerService } from './customer.service';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly serviceCustomer: CustomerService) {}

  @Post()
  @ApiResponse({
    type: CustomerDTO,
  })
  async create(
    @Body() createCustomerDTO: CreateCustomerDTO,
  ): Promise<CustomerDTO> {
    return this.serviceCustomer.create(createCustomerDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [CustomerDTO],
  })
  async findAll(): Promise<CustomerDTO[]> {
    return this.serviceCustomer.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [CustomerDTO],
  })
  async search(
    @Query() filterCustomerDTO: FilterCustomerDTO,
  ): Promise<CustomerDTO[]> {
    return this.serviceCustomer.findByFilter(filterCustomerDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: CustomerDTO,
  })
  findOne(@Param('id') id: string): Promise<CustomerDTO> {
    return this.serviceCustomer.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: CustomerDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ): Promise<CustomerDTO> {
    return this.serviceCustomer.update(id, updateCustomerDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceCustomer.remove(id);
  }
}
