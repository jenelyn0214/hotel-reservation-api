import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { DemoSchema, IDemoDoc } from '@src/schema/demo.schema';

import {
  CreateDemoDTO,
  DemoDTO,
  FilterDemoDTO,
  UpdateDemoDTO,
} from './demo.dto';

@Injectable()
export class DemoService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Demo || model<IDemoDoc>('Demo', DemoSchema);
  }
  async create(createDemoDTO: CreateDemoDTO): Promise<DemoDTO> {
    const demo = await this.serviceModel.create(createDemoDTO);

    return demo.toJSON() as DemoDTO;
  }

  async findAll(): Promise<DemoDTO[]> {
    const demosResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const demos = demosResult.map((u) => u.toJSON() as DemoDTO);

    return demos;
  }

  async findByFilter(filterDemoDTO: FilterDemoDTO): Promise<DemoDTO[]> {
    const demosResult = await this.serviceModel
      .find({ ...filterDemoDTO, deleted: null })
      .exec();

    const demos = demosResult.map((u) => u.toJSON() as DemoDTO);

    return demos;
  }

  async findOne(id: string): Promise<DemoDTO> {
    const demo = await this.serviceModel.findOne({ _id: id }).exec();

    return demo.toJSON() as DemoDTO;
  }

  async update(id: string, updateDemoDTO: UpdateDemoDTO): Promise<DemoDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateDemoDTO,
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
