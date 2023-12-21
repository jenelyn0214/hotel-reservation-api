import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { UserService } from '@src/api/user/user.service';
import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  IUserRequestDoc,
  UserRequestSchema,
} from '@src/schema/user-request.schema';

import {
  CreateUserRequestDTO,
  FilterUserRequestDTO,
  UpdateUserRequestDTO,
  UserRequestsDTO,
} from './user-request.dto';

@Injectable()
export class UserRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly userService: UserService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.UserRequest ||
      model<IUserRequestDoc>('UserRequest', UserRequestSchema);
  }
  async create(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserRequestsDTO> {
    const userRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        userId: createUserRequestDTO.userId,
        userType: createUserRequestDTO.userType,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!userRequestResult) {
      const userRequest = await this.serviceModel.create(createUserRequestDTO);

      return userRequest.toJSON() as UserRequestsDTO;
    } else {
      return userRequestResult.toJSON() as UserRequestsDTO;
    }
  }

  async findAll(): Promise<UserRequestsDTO[]> {
    const userRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const userRequests = userRequestsResult.map(
      (u) => u.toJSON() as UserRequestsDTO,
    );

    return userRequests;
  }

  async findByFilter(
    filterUserRequestDTO: FilterUserRequestDTO,
  ): Promise<UserRequestsDTO[]> {
    const userRequestsResult = await this.serviceModel
      .find({ ...filterUserRequestDTO, deleted: null })
      .exec();

    const userRequests = userRequestsResult.map(
      (u) => u.toJSON() as UserRequestsDTO,
    );

    return userRequests;
  }

  async findOne(id: string): Promise<UserRequestsDTO> {
    const userRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const userRequest: UserRequestsDTO =
      userRequestResult.toJSON() as UserRequestsDTO;

    return userRequest;
  }

  async update(
    id: string,
    updateUserRequestDTO: UpdateUserRequestDTO,
  ): Promise<UserRequestsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateUserRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const userRequest = await this.findOne(id);

    if (
      updateUserRequestDTO.status &&
      updateUserRequestDTO.status === StatusEnum.APPROVED
    ) {
      await this.userService.generateUserTypeAccount(
        userRequest.userId,
        userRequest.userType,
      );
    }

    return userRequest;
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
