import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IToDoDoc, ToDoSchema } from '@src/schema/to-do.schema';

import {
  CreateToDoDTO,
  FilterToDoDTO,
  ToDoDTO,
  UpdateToDoDTO,
} from './to-do.dto';

@Injectable()
export class ToDoService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.ToDo || model<IToDoDoc>('ToDo', ToDoSchema);
  }
  async create(createToDoDTO: CreateToDoDTO): Promise<ToDoDTO> {
    const toDo = await this.serviceModel.create(createToDoDTO);

    return toDo.toJSON() as ToDoDTO;
  }

  async findAll(): Promise<ToDoDTO[]> {
    const toDosResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const toDos = toDosResult.map((u) => u.toJSON() as ToDoDTO);

    return toDos;
  }

  async findByFilter(filterToDoDTO: FilterToDoDTO): Promise<ToDoDTO[]> {
    const toDosResult = await this.serviceModel
      .find({ ...filterToDoDTO, deleted: null })
      .exec();

    const toDos = toDosResult.map((u) => u.toJSON() as ToDoDTO);

    return toDos;
  }

  async findOne(id: string): Promise<ToDoDTO> {
    const toDo = await this.serviceModel.findOne({ _id: id }).exec();

    return toDo.toJSON() as ToDoDTO;
  }

  async update(id: string, updateToDoDTO: UpdateToDoDTO): Promise<ToDoDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateToDoDTO,
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
