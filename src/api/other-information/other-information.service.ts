import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  IOtherInformationDoc,
  OtherInformationSchema,
} from '@src/schema/other-information.schema';

import {
  CreateOtherInformationDTO,
  FilterOtherInformationDTO,
  OtherInformationDTO,
  UpdateOtherInformationDTO,
} from './other-information.dto';

@Injectable()
export class OtherInformationService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.OtherInformation ||
      model<IOtherInformationDoc>('OtherInformation', OtherInformationSchema);
  }
  async create(
    createOtherInformationDTO: CreateOtherInformationDTO,
  ): Promise<OtherInformationDTO> {
    const otherInformation = await this.serviceModel.create(
      createOtherInformationDTO,
    );

    return otherInformation.toJSON() as OtherInformationDTO;
  }

  async findAll(): Promise<OtherInformationDTO[]> {
    const otherInformationsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const otherInformations = otherInformationsResult.map(
      (u) => u.toJSON() as OtherInformationDTO,
    );

    return otherInformations;
  }

  async findByFilter(
    filterOtherInformationDTO: FilterOtherInformationDTO,
  ): Promise<OtherInformationDTO[]> {
    const otherInformationsResult = await this.serviceModel
      .find({ ...filterOtherInformationDTO, deleted: null })
      .exec();

    const otherInformations = otherInformationsResult.map(
      (u) => u.toJSON() as OtherInformationDTO,
    );

    return otherInformations;
  }

  async findOne(id: string): Promise<OtherInformationDTO> {
    const otherInformation = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    return otherInformation.toJSON() as OtherInformationDTO;
  }

  async update(
    id: string,
    updateOtherInformationDTO: UpdateOtherInformationDTO,
  ): Promise<OtherInformationDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateOtherInformationDTO,
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
