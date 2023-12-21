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
  CreateUserDTO,
  FilterUserDTO,
  UpdateUserDTO,
  UserDTO,
} from './user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiResponse({
    type: UserDTO,
  })
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(createUserDTO);
  }

  @Get()
  @ApiResponse({
    type: [UserDTO],
  })
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [UserDTO],
  })
  async search(@Query() filterUserDTO: FilterUserDTO): Promise<UserDTO[]> {
    return this.userService.findByFilter(filterUserDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: UserDTO,
  })
  findOne(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: UserDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }
}
