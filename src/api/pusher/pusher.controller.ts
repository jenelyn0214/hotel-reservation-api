import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@src/common/decorators';

import {
  PusherChannelDTO,
  PusherCreateChannelRequestDTO,
  PusherCreateUserRequestDTO,
  PusherRequestDTO,
  PusherUserDTO,
} from './pusher.dto';
import { PusherService } from './pusher.service';

@ApiTags('pusher')
@Controller('pusher')
export class PusherController {
  constructor(private readonly pusherService: PusherService) {}

  @Public()
  @Post('/send')
  @ApiResponse({
    type: Boolean,
  })
  async sendNotification(@Body() data: PusherRequestDTO): Promise<boolean> {
    return this.pusherService.sendNotification(data);
  }

  @Post('/add-user')
  @ApiResponse({
    type: PusherUserDTO,
  })
  async addUserToPusher(
    @Body() data: PusherCreateUserRequestDTO,
  ): Promise<PusherUserDTO> {
    return this.pusherService.addUserToPusher(data);
  }

  @Post('/add-channel')
  @ApiResponse({
    type: PusherUserDTO,
  })
  async addChannelToPusher(
    @Body() data: PusherCreateChannelRequestDTO,
  ): Promise<PusherChannelDTO> {
    return this.pusherService.addChannelToPusher(data);
  }
}
