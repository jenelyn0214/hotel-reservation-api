import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IRoleDoc, RoleSchema } from '@src/schema/role.schema';

import {
  CreateRoleDTO,
  FilterRoleDTO,
  RoleDTO,
  UpdateRoleDTO,
} from './role.dto';

@Injectable()
export class RoleService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Role || model<IRoleDoc>('Role', RoleSchema);
  }
  async create(createRoleDTO: CreateRoleDTO): Promise<RoleDTO> {
    const role = await this.serviceModel.create(createRoleDTO);

    return role.toJSON() as RoleDTO;
  }

  async findAll(): Promise<RoleDTO[]> {
    const rolesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const roles = rolesResult.map((u) => u.toJSON() as RoleDTO);

    return roles;
  }

  async findByFilter(filterRoleDTO: FilterRoleDTO): Promise<RoleDTO[]> {
    const rolesResult = await this.serviceModel
      .find({ ...filterRoleDTO, deleted: null })
      .exec();

    const roles = rolesResult.map((u) => u.toJSON() as RoleDTO);

    return roles;
  }

  async findOne(id: string): Promise<RoleDTO> {
    const role = await this.serviceModel.findOne({ _id: id }).exec();

    return role.toJSON() as RoleDTO;
  }

  async update(id: string, updateRoleDTO: UpdateRoleDTO): Promise<RoleDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRoleDTO,
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
