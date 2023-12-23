import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Model, model } from 'mongoose';

import cConfig from '@src/config/common.config';
import { DatabaseService } from '@src/database/database.service';
import { IUserDoc, UserSchema } from '@src/schema/user.schema';
import { encryptPassword } from '@src/util/password';

import {
  CreateUserDTO,
  FilterUserDTO,
  UpdateUserDTO,
  UserDTO,
} from './user.dto';

@Injectable()
export class UserService {
  private serviceModel: typeof Model;

  constructor(
    @Inject(cConfig.KEY)
    private readonly commonConfig: ConfigType<typeof cConfig>,
    private readonly dbService: DatabaseService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.User || model<IUserDoc>('User', UserSchema);
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const password = encryptPassword(createUserDTO.password);

    const fullName =
      createUserDTO.firstName +
      ' ' +
      (createUserDTO.middleName ? createUserDTO.middleName[0] + '. ' : '') +
      createUserDTO.lastName;

    const user = await this.serviceModel.create({
      ...createUserDTO,
      password,
      fullName,
    });

    return user.toJSON() as UserDTO;
  }

  async findAll(): Promise<UserDTO[]> {
    const usersResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const users = usersResult.map((u) => u.toJSON() as UserDTO);

    return users;
  }

  async findByFilter(filterUserDTO: FilterUserDTO): Promise<UserDTO[]> {
    const { createdFrom, createdTo, ...filters } = filterUserDTO;

    let filterData = {
      ...filters,
      deleted: null,
    } as unknown as any;

    if (createdFrom && createdTo) {
      createdTo.setHours(23, 59, 59, 999);
      filterData = {
        ...filterData,
        created: { $gte: createdFrom, $lte: createdTo },
      };
    }

    const usersResult = await this.serviceModel.find(filterData).exec();

    const users = usersResult.map((u) => u.toJSON() as UserDTO);

    return users;
  }

  async findOne(id: string): Promise<UserDTO> {
    const user = await this.serviceModel.findOne({ _id: id }).exec();

    return user.toJSON() as UserDTO;
  }

  async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
    updateLogin?: boolean,
  ): Promise<UserDTO> {
    const user: UserDTO = await this.findOne(id);

    const dataToUpdate = { ...updateUserDTO, updated: Date.now() };

    const firstName = dataToUpdate.firstName ?? user.firstName;
    const middleName = dataToUpdate.middleName ?? user.middleName;
    const lastName = dataToUpdate.lastName ?? user.lastName;

    const fullName =
      firstName + ' ' + (middleName ? middleName[0] + '. ' : '') + lastName;

    const login = updateLogin ? Date.now() : null;

    const password = updateUserDTO.password
      ? encryptPassword(updateUserDTO.password)
      : user.password;

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...dataToUpdate,
          fullName,
          login,
          password,
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
