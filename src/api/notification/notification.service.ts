import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Model, model } from 'mongoose';
import Channels from 'pusher';

import {
  CreateNotificationDTO,
  FilterNotificationDTO,
  NotificationDTO,
  UpdateNotificationDTO,
} from '@src/api/notification/notification.dto';
import pusherConfig from '@src/config/pusher.config';
import { DatabaseService } from '@src/database/database.service';
import { PusherEventsEnum } from '@src/enums';
import {
  INotificationDoc,
  NotificationSchema,
} from '@src/schema/notification.schema';

@Injectable()
export class NotificationService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    @Inject(pusherConfig.KEY)
    private readonly notifConfig: ConfigType<typeof pusherConfig>,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.Notification ||
      model<INotificationDoc>('Notification', NotificationSchema);
  }
  async create(
    createNotificationDTO: CreateNotificationDTO,
  ): Promise<NotificationDTO> {
    const notification = await this.serviceModel.create(createNotificationDTO);

    const notificationData = notification.toJSON() as NotificationDTO;

    await this.sendNotification(notificationData);

    return notificationData;
  }

  async findAll(): Promise<NotificationDTO[]> {
    const notificationsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const notifications = notificationsResult.map(
      (u) => u.toJSON() as NotificationDTO,
    );

    return notifications;
  }

  async findByFilter(
    filterNotificationDTO: FilterNotificationDTO,
  ): Promise<NotificationDTO[]> {
    const notificationsResult = await this.serviceModel
      .find({ ...filterNotificationDTO, deleted: null })
      .exec();

    const notifications = notificationsResult.map(
      (u) => u.toJSON() as NotificationDTO,
    );

    return notifications;
  }

  async findOne(id: string): Promise<NotificationDTO> {
    const notificationResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const notification: NotificationDTO =
      notificationResult.toJSON() as NotificationDTO;

    return notification;
  }

  async update(
    id: string,
    updateNotificationDTO: UpdateNotificationDTO,
  ): Promise<NotificationDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateNotificationDTO,
          updated: Date.now(),
        },
      )
      .exec();

    return await this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.serviceModel
      .updateOne({ _id: id }, { deleted: Date.now() })
      .exec()
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    return result;
  }

  async sendNotification(data: NotificationDTO): Promise<boolean> {
    try {
      const channels = new Channels({
        appId: this.notifConfig.appId,
        key: this.notifConfig.key,
        secret: this.notifConfig.secret,
        cluster: this.notifConfig.cluster,
      });

      (await channels) &&
        channels.trigger(
          data.toUserId,
          PusherEventsEnum.USER_NOTIFICATIONS,
          data,
        );

      return true;
    } catch (e) {
      return false;
    }
  }
}
