import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { UserService } from '@src/api/user/user.service';
import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  IUserIDRequestDoc,
  UserIDRequestSchema,
} from '@src/schema/user-id-request.schema';

import {
  CreateUserIDRequestDTO,
  FilterUserIDRequestDTO,
  UpdateUserIDRequestDTO,
  UserIDRequestDTO,
} from './user-id-request.dto';

@Injectable()
export class UserIDRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly userService: UserService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.UserIDRequest ||
      model<IUserIDRequestDoc>('UserIDRequest', UserIDRequestSchema);
  }
  async create(
    createUserIDRequestDTO: CreateUserIDRequestDTO,
  ): Promise<UserIDRequestDTO> {
    const userIDRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        userId: createUserIDRequestDTO.userId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!userIDRequestResult) {
      const userIDRequest = await this.serviceModel.create(
        createUserIDRequestDTO,
      );

      return userIDRequest.toJSON() as UserIDRequestDTO;
    } else {
      return userIDRequestResult.toJSON() as UserIDRequestDTO;
    }
  }

  async findAll(): Promise<UserIDRequestDTO[]> {
    const userIDRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const userIDRequests = userIDRequestsResult.map(
      (u) => u.toJSON() as UserIDRequestDTO,
    );

    return userIDRequests;
  }

  async findByFilter(
    filterUserIDRequestDTO: FilterUserIDRequestDTO,
  ): Promise<UserIDRequestDTO[]> {
    const userIdRequestsResult = await this.serviceModel
      .find({ ...filterUserIDRequestDTO, deleted: null })
      .exec();

    const userIdRequests = userIdRequestsResult.map(
      (u) => u.toJSON() as UserIDRequestDTO,
    );

    return userIdRequests;
  }

  async findOne(id: string): Promise<UserIDRequestDTO> {
    const userIDRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const userIDRequest: UserIDRequestDTO =
      userIDRequestResult.toJSON() as UserIDRequestDTO;

    return userIDRequest;
  }

  async update(
    id: string,
    updateUserIDRequestDTO: UpdateUserIDRequestDTO,
  ): Promise<UserIDRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateUserIDRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const userIDRequest = await this.findOne(id);

    if (
      updateUserIDRequestDTO.status &&
      updateUserIDRequestDTO.status === StatusEnum.APPROVED
    ) {
      await this.userService.updateIdInformation(userIDRequest);
    }

    return userIDRequest;
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
}
