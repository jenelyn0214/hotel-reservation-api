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
  CreateUserPermissionDTO,
  FilterUserPermissionDTO,
  UpdateUserPermissionDTO,
  UserPermissionDTO,
} from './user-permission.dto';
import { UserPermissionService } from './user-permission.service';

@ApiTags('user permission')
@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Post()
  @ApiResponse({
    type: UserPermissionDTO,
  })
  async create(
    @Body() createUserPermissionDTO: CreateUserPermissionDTO,
  ): Promise<UserPermissionDTO> {
    return this.userPermissionService.create(createUserPermissionDTO);
  }

  @Get()
  @ApiResponse({
    type: [UserPermissionDTO],
  })
  async findAll(): Promise<UserPermissionDTO[]> {
    return this.userPermissionService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [UserPermissionDTO],
  })
  async search(
    @Query() filterUserPermissionDTO: FilterUserPermissionDTO,
  ): Promise<UserPermissionDTO[]> {
    return this.userPermissionService.findByFilter(filterUserPermissionDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: UserPermissionDTO,
  })
  findOne(@Param('id') id: string): Promise<UserPermissionDTO> {
    return this.userPermissionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: UserPermissionDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserPermissionDTO: UpdateUserPermissionDTO,
  ): Promise<UserPermissionDTO> {
    return this.userPermissionService.update(id, updateUserPermissionDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.userPermissionService.remove(id);
  }
}
