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
  CreateMenuDTO,
  FilterMenuDTO,
  MenuDTO,
  UpdateMenuDTO,
} from './menu.dto';
import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly serviceMenu: MenuService) {}

  @Post()
  @ApiResponse({
    type: MenuDTO,
  })
  async create(@Body() createMenuDTO: CreateMenuDTO): Promise<MenuDTO> {
    return this.serviceMenu.create(createMenuDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [MenuDTO],
  })
  async findAll(): Promise<MenuDTO[]> {
    return this.serviceMenu.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [MenuDTO],
  })
  async search(@Query() filterMenuDTO: FilterMenuDTO): Promise<MenuDTO[]> {
    return this.serviceMenu.findByFilter(filterMenuDTO);
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    type: MenuDTO,
  })
  findOne(@Param('id') id: string): Promise<MenuDTO> {
    return this.serviceMenu.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: MenuDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateMenuDTO: UpdateMenuDTO,
  ): Promise<MenuDTO> {
    return this.serviceMenu.update(id, updateMenuDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.serviceMenu.remove(id);
  }
}
