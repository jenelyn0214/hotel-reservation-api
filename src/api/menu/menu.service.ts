import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IMenuDoc, MenuSchema } from '@src/schema/menu.schema';

import {
  CreateMenuDTO,
  FilterMenuDTO,
  MenuDTO,
  UpdateMenuDTO,
} from './menu.dto';

@Injectable()
export class MenuService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IMenuDoc>('Menu', MenuSchema);
  }
  async create(createMenuDTO: CreateMenuDTO): Promise<MenuDTO> {
    const menuType = await this.serviceModel.create(createMenuDTO);

    return menuType.toJSON() as MenuDTO;
  }

  async findAll(): Promise<MenuDTO[]> {
    const menuTypesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const menuTypes = menuTypesResult.map((u) => u.toJSON() as MenuDTO);

    return menuTypes;
  }

  async findByFilter(filterMenuDTO: FilterMenuDTO): Promise<MenuDTO[]> {
    const menuTypesResult = await this.serviceModel
      .find({ ...filterMenuDTO, deleted: null })
      .exec();

    const menuTypes = menuTypesResult.map((u) => u.toJSON() as MenuDTO);

    return menuTypes;
  }

  async findOne(id: string): Promise<MenuDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as MenuDTO;
  }

  async update(id: string, updateMenuDTO: UpdateMenuDTO): Promise<MenuDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateMenuDTO,
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
