import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { HallSchema, IHallDoc } from '@src/schema/hall.schema';

import {
  CreateHallDTO,
  FilterHallDTO,
  HallDTO,
  UpdateHallDTO,
} from './hall.dto';

@Injectable()
export class HallService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IHallDoc>('Hall', HallSchema);
  }
  async create(createHallDTO: CreateHallDTO): Promise<HallDTO> {
    const hall = await this.serviceModel.create(createHallDTO);

    return hall.toJSON() as HallDTO;
  }

  async findAll(): Promise<HallDTO[]> {
    const hallsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const halls = hallsResult.map((u) => u.toJSON() as HallDTO);

    return halls;
  }

  async findByFilter(filterHallDTO: FilterHallDTO): Promise<HallDTO[]> {
    const hallsResult = await this.serviceModel
      .find({ ...filterHallDTO, deleted: null })
      .exec();

    const halls = hallsResult.map((u) => u.toJSON() as HallDTO);

    return halls;
  }

  async findOne(id: string): Promise<HallDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as HallDTO;
  }

  async update(id: string, updateHallDTO: UpdateHallDTO): Promise<HallDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateHallDTO,
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
