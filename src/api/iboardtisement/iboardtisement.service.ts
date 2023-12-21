import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  IIboardtisementDoc,
  IboardtisementSchema,
} from '@src/schema/iboardtisement.schema';

import {
  CreateIboardtisementDTO,
  FilterIboardtisementDTO,
  IboardtisementDTO,
  UpdateIboardtisementDTO,
} from './iboardtisement.dto';

@Injectable()
export class IboardtisementService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Iboardtisement ||
      model<IIboardtisementDoc>('Iboardtisement', IboardtisementSchema);
  }
  async create(
    createIboardtisementDTO: CreateIboardtisementDTO,
  ): Promise<IboardtisementDTO> {
    const iboardtisement = await this.serviceModel.create(
      createIboardtisementDTO,
    );

    return iboardtisement.toJSON() as IboardtisementDTO;
  }

  async findAll(): Promise<IboardtisementDTO[]> {
    const iboardtisementsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const iboardtisements = iboardtisementsResult.map(
      (u) => u.toJSON() as IboardtisementDTO,
    );

    return iboardtisements;
  }

  async findByFilter(
    filterIboardtisementDTO: FilterIboardtisementDTO,
  ): Promise<IboardtisementDTO[]> {
    const iboardtisementsResult = await this.serviceModel
      .find({ ...filterIboardtisementDTO, deleted: null })
      .exec();

    const iboardtisements = iboardtisementsResult.map(
      (u) => u.toJSON() as IboardtisementDTO,
    );

    return iboardtisements;
  }

  async findOne(id: string): Promise<IboardtisementDTO> {
    const iboardtisement = await this.serviceModel.findOne({ _id: id }).exec();

    return iboardtisement.toJSON() as IboardtisementDTO;
  }

  async update(
    id: string,
    updateIboardtisementDTO: UpdateIboardtisementDTO,
  ): Promise<IboardtisementDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateIboardtisementDTO,
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
