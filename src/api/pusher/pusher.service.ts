import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Pusher, { PresenceChannelData, UserChannelData } from 'pusher';

import { UserService } from '@src/api/user/user.service';
import pusherConfig from '@src/config/pusher.config';

import {
  PusherChannelDTO,
  PusherCreateChannelRequestDTO,
  PusherCreateUserRequestDTO,
  PusherRequestDTO,
  PusherUserDTO,
} from './pusher.dto';

@Injectable()
export class PusherService {
  pusherInstance: Pusher = null;
  constructor(
    @Inject(pusherConfig.KEY)
    private readonly notifConfig: ConfigType<typeof pusherConfig>,
    private readonly userService: UserService,
  ) {
    this.pusherInstance = new Pusher({
      appId: this.notifConfig.appId,
      key: this.notifConfig.key,
      secret: this.notifConfig.secret,
      cluster: this.notifConfig.cluster,
    });
  }

  async sendNotification(data: PusherRequestDTO): Promise<boolean> {
    try {
      (await this.pusherInstance) &&
        this.pusherInstance.trigger(data.userId, data.eventKey, data.message);

      return true;
    } catch (e) {
      return false;
    }
  }

  async addUserToPusher(
    data: PusherCreateUserRequestDTO,
  ): Promise<PusherUserDTO> {
    const user = await this.userService.findOne(data.userId);

    const userData: UserChannelData = {
      id: user.id,
      user_info: {
        ...user,
      },
    };

    return this.pusherInstance.authenticateUser(data.socketId, userData);
  }

  async addChannelToPusher(
    data: PusherCreateChannelRequestDTO,
  ): Promise<PusherChannelDTO> {
    const user = await this.userService.findOne(data.userId);
    const userData: PresenceChannelData = {
      user_id: user.id,
      user_info: {
        ...user,
      },
    };

    return this.pusherInstance.authorizeChannel(
      data.socketId,
      data.channelName,
      userData,
    );
  }
}
