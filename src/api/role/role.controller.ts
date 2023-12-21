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
  CreateRoleDTO,
  FilterRoleDTO,
  RoleDTO,
  UpdateRoleDTO,
} from './role.dto';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({
    type: RoleDTO,
  })
  async create(@Body() createRoleDTO: CreateRoleDTO): Promise<RoleDTO> {
    return this.roleService.create(createRoleDTO);
  }

  @Get()
  @ApiResponse({
    type: [RoleDTO],
  })
  async findAll(): Promise<RoleDTO[]> {
    return this.roleService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [RoleDTO],
  })
  async search(@Query() filterRoleDTO: FilterRoleDTO): Promise<RoleDTO[]> {
    return this.roleService.findByFilter(filterRoleDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: RoleDTO,
  })
  findOne(@Param('id') id: string): Promise<RoleDTO> {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: RoleDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRoleDTO: UpdateRoleDTO,
  ): Promise<RoleDTO> {
    return this.roleService.update(id, updateRoleDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.roleService.remove(id);
  }
}
