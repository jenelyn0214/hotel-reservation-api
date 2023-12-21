import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  IUserPermissionDoc,
  UserPermissionSchema,
} from '@src/schema/user-permission.schema';

import {
  CreateUserPermissionDTO,
  FilterUserPermissionDTO,
  UpdateUserPermissionDTO,
  UserPermissionDTO,
} from './user-permission.dto';

@Injectable()
export class UserPermissionService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.UserPermission ||
      model<IUserPermissionDoc>('UserPermission', UserPermissionSchema);
  }
  async create(
    createUserPermissionDTO: CreateUserPermissionDTO,
  ): Promise<UserPermissionDTO> {
    const userPermission = await this.serviceModel.create(
      createUserPermissionDTO,
    );

    return userPermission.toJSON() as UserPermissionDTO;
  }
  async findAll(): Promise<UserPermissionDTO[]> {
    const userPermissionsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const userPermissions = userPermissionsResult.map(
      (u) => u.toJSON() as UserPermissionDTO,
    );

    return userPermissions;
  }

  async findByFilter(
    filterUserPermissionDTO: FilterUserPermissionDTO,
  ): Promise<UserPermissionDTO[]> {
    const userPermissionsResult = await this.serviceModel
      .find({ ...filterUserPermissionDTO, deleted: null })
      .exec();

    const userPermissions = userPermissionsResult.map(
      (u) => u.toJSON() as UserPermissionDTO,
    );

    return userPermissions;
  }

  async findOne(id: string): Promise<UserPermissionDTO> {
    const userPermission = await this.serviceModel.findOne({ _id: id }).exec();

    return userPermission.toJSON() as UserPermissionDTO;
  }

  async update(
    id: string,
    updateUserPermissionDTO: UpdateUserPermissionDTO,
  ): Promise<UserPermissionDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateUserPermissionDTO,
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
}
