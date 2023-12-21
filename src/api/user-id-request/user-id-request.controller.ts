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
  CreateUserIDRequestDTO,
  FilterUserIDRequestDTO,
  UpdateUserIDRequestDTO,
  UserIDRequestDTO,
} from './user-id-request.dto';
import { UserIDRequestService } from './user-id-request.service';

@ApiTags('user id request')
@Controller('user-id-request')
export class UserIDRequestController {
  constructor(private readonly userIDRequestService: UserIDRequestService) {}

  @Post()
  @ApiResponse({
    type: UserIDRequestDTO,
  })
  async create(
    @Body() createUserIDRequestDTO: CreateUserIDRequestDTO,
  ): Promise<UserIDRequestDTO> {
    return this.userIDRequestService.create(createUserIDRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [UserIDRequestDTO],
  })
  async findAll(): Promise<UserIDRequestDTO[]> {
    return this.userIDRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [UserIDRequestDTO],
  })
  async search(
    @Query() filterUserIDRequestDTO: FilterUserIDRequestDTO,
  ): Promise<UserIDRequestDTO[]> {
    return this.userIDRequestService.findByFilter(filterUserIDRequestDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: UserIDRequestDTO,
  })
  findOne(@Param('id') id: string): Promise<UserIDRequestDTO> {
    return this.userIDRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: UserIDRequestDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserIDRequestDTO: UpdateUserIDRequestDTO,
  ): Promise<UserIDRequestDTO> {
    return this.userIDRequestService.update(id, updateUserIDRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.userIDRequestService.remove(id);
  }
}
