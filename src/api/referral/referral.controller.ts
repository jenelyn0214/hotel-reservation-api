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
import { IReferralReward } from '@src/interfaces';

import {
  AddReferralRewardsDTO,
  CreateReferralDTO,
  CreateReferralUserDTO,
  FilterReferralDTO,
  ReferralDTO,
  ReferralRewardsDTO,
  ReferralUserDTO,
  UpdateReferralDTO,
  UpdateReferralUserDTO,
} from './referral.dto';
import { ReferralService } from './referral.service';

@ApiTags('referral')
@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Public()
  @Post()
  @ApiResponse({
    type: ReferralDTO,
  })
  async create(
    @Body() createReferralDTO: CreateReferralDTO,
  ): Promise<ReferralDTO> {
    return this.referralService.create(createReferralDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: [ReferralDTO],
  })
  async findAll(): Promise<ReferralDTO[]> {
    return this.referralService.findAll();
  }

  @Public()
  @Get('search')
  @ApiResponse({
    type: [ReferralDTO],
  })
  async search(
    @Query() filterReferralDTO: FilterReferralDTO,
  ): Promise<ReferralDTO[]> {
    return this.referralService.findByFilter(filterReferralDTO);
  }

  @Public()
  @Get('rewards')
  @ApiResponse({
    type: ReferralRewardsDTO,
  })
  async getRewards(): Promise<IReferralReward> {
    return this.referralService.getRewardPoints();
  }

  @Get(':id')
  @ApiResponse({
    type: ReferralDTO,
  })
  findOne(@Param('id') id: string): Promise<ReferralDTO> {
    return this.referralService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ReferralDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() updateReferralDTO: UpdateReferralDTO,
  ): Promise<ReferralDTO> {
    return this.referralService.update(id, updateReferralDTO);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
  })
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.referralService.remove(id);
  }

  @Public()
  @Post(':id/add-rewards')
  @ApiResponse({
    type: ReferralDTO,
  })
  async post(
    @Param('id') id: string,
    @Body() addReferralRewardDTO: AddReferralRewardsDTO,
  ): Promise<ReferralDTO> {
    return this.referralService.addRewards(id, addReferralRewardDTO);
  }

  @Public()
  @Post(':id/user')
  @ApiResponse({
    type: [ReferralUserDTO],
  })
  async createReferralUser(
    @Param('id') id: string,
    @Body() createReferralUserDTO: CreateReferralUserDTO,
  ): Promise<ReferralUserDTO[]> {
    return this.referralService.createReferralUser(id, createReferralUserDTO);
  }

  @Patch(':id/user/:referralId')
  @ApiResponse({
    type: [ReferralUserDTO],
  })
  async updateReferralUser(
    @Param('id') id: string,
    @Param('referralId') itemId: string,
    @Body() updateReferralUserDTO: UpdateReferralUserDTO,
  ): Promise<ReferralUserDTO[]> {
    return this.referralService.updateReferralUser(
      id,
      itemId,
      updateReferralUserDTO,
    );
  }

  @Delete(':id/user/:referralId')
  @ApiResponse({
    type: [ReferralUserDTO],
  })
  async deleteReferralUser(
    @Param('id') id: string,
    @Param('referralId') itemId: string,
  ): Promise<ReferralUserDTO[]> {
    return this.referralService.deleteReferralUser(id, itemId);
  }
}
