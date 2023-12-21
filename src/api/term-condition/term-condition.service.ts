import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  ITermConditionDoc,
  TermConditionSchema,
} from '@src/schema/term-condition.schema';

import {
  CreateTermConditionDTO,
  FilterTermConditionDTO,
  TermConditionDTO,
  UpdateTermConditionDTO,
} from './term-condition.dto';

@Injectable()
export class TermConditionService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.TermCondition ||
      model<ITermConditionDoc>('TermCondition', TermConditionSchema);
  }
  async create(
    createTermConditionDTO: CreateTermConditionDTO,
  ): Promise<TermConditionDTO> {
    const termCondition = await this.serviceModel.create(
      createTermConditionDTO,
    );

    return termCondition.toJSON() as TermConditionDTO;
  }

  async findAll(): Promise<TermConditionDTO[]> {
    const termConditionsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const termConditions = termConditionsResult.map(
      (u) => u.toJSON() as TermConditionDTO,
    );

    return termConditions;
  }

  async findByFilter(
    filterTermConditionDTO: FilterTermConditionDTO,
  ): Promise<TermConditionDTO[]> {
    const termConditionsResult = await this.serviceModel
      .find({ ...filterTermConditionDTO, deleted: null })
      .exec();

    const termConditions = termConditionsResult.map(
      (u) => u.toJSON() as TermConditionDTO,
    );

    return termConditions;
  }

  async findOne(id: string): Promise<TermConditionDTO> {
    const termCondition = await this.serviceModel.findOne({ _id: id }).exec();

    return termCondition.toJSON() as TermConditionDTO;
  }

  async update(
    id: string,
    updateTermConditionDTO: UpdateTermConditionDTO,
  ): Promise<TermConditionDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateTermConditionDTO,
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
