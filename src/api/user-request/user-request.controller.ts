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
  CreateUserRequestDTO,
  FilterUserRequestDTO,
  UpdateUserRequestDTO,
  UserRequestsDTO,
} from './user-request.dto';
import { UserRequestService } from './user-request.service';

@ApiTags('user request')
@Controller('user-request')
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Post()
  @ApiResponse({
    type: UserRequestsDTO,
  })
  async create(
    @Body() createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserRequestsDTO> {
    return this.userRequestService.create(createUserRequestDTO);
  }

  @Get()
  @ApiResponse({
    type: [UserRequestsDTO],
  })
  async findAll(): Promise<UserRequestsDTO[]> {
    return this.userRequestService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [UserRequestsDTO],
  })
  async search(
    @Query() filterUserRequestDTO: FilterUserRequestDTO,
  ): Promise<UserRequestsDTO[]> {
    return this.userRequestService.findByFilter(filterUserRequestDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: UserRequestsDTO,
  })
  findOne(@Param('id') id: string): Promise<UserRequestsDTO> {
    return this.userRequestService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: UserRequestsDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserRequestsDTO> {
    return this.userRequestService.update(id, updateUserRequestDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.userRequestService.remove(id);
  }
}
