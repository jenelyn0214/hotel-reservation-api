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
  CreateWalletDTO,
  FilterWalletDTO,
  UpdateWalletDTO,
  WalletDTO,
} from './wallet.dto';
import { WalletService } from './wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiResponse({
    type: WalletDTO,
  })
  async create(@Body() createWalletDTO: CreateWalletDTO): Promise<WalletDTO> {
    return this.walletService.create(createWalletDTO);
  }

  @Get()
  @ApiResponse({
    type: [WalletDTO],
  })
  async findAll(): Promise<WalletDTO[]> {
    return this.walletService.findAll();
  }

  @Get('search')
  @ApiResponse({
    type: [WalletDTO],
  })
  async search(
    @Query() filterWalletDTO: FilterWalletDTO,
  ): Promise<WalletDTO[]> {
    return this.walletService.findByFilter(filterWalletDTO);
  }

  @Get(':id')
  @ApiResponse({
    type: WalletDTO,
  })
  findOne(@Param('id') id: string): Promise<WalletDTO> {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: WalletDTO,
  })
  async patch(
    @Param('id') id: string,
    @Body() updateWalletDTO: UpdateWalletDTO,
  ): Promise<WalletDTO> {
    return this.walletService.update(id, updateWalletDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.walletService.remove(id);
  }
}
