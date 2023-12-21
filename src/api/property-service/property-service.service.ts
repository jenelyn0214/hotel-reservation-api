import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  IPropertyServiceDoc,
  PropertyServiceSchema,
} from '@src/schema/property-service.schema';

import {
  CreatePropertyServiceDTO,
  FilterPropertyServiceDTO,
  PropertyServiceDTO,
  UpdatePropertyServiceDTO,
} from './property-service.dto';

@Injectable()
export class PropertyServiceService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.PropertyService ||
      model<IPropertyServiceDoc>('PropertyService', PropertyServiceSchema);
  }
  async create(
    createPropertyServiceDTO: CreatePropertyServiceDTO,
  ): Promise<PropertyServiceDTO> {
    const propertyService = await this.serviceModel.create(
      createPropertyServiceDTO,
    );

    return propertyService.toJSON() as PropertyServiceDTO;
  }

  async findAll(): Promise<PropertyServiceDTO[]> {
    const propertyServicesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const propertyServices = propertyServicesResult.map(
      (u) => u.toJSON() as PropertyServiceDTO,
    );

    return propertyServices;
  }

  async findByFilter(
    filterPropertyServiceDTO: FilterPropertyServiceDTO,
  ): Promise<PropertyServiceDTO[]> {
    const propertyServicesResult = await this.serviceModel
      .find({ ...filterPropertyServiceDTO, deleted: null })
      .exec();

    const propertyServices = propertyServicesResult.map(
      (u) => u.toJSON() as PropertyServiceDTO,
    );

    return propertyServices;
  }

  async findOne(id: string): Promise<PropertyServiceDTO> {
    const propertyService = await this.serviceModel.findOne({ _id: id }).exec();

    return propertyService.toJSON() as PropertyServiceDTO;
  }

  async update(
    id: string,
    updatePropertyServiceDTO: UpdatePropertyServiceDTO,
  ): Promise<PropertyServiceDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updatePropertyServiceDTO,
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

  async getPropertyServiceByPropertyOwner(
    userId: string,
  ): Promise<PropertyServiceDTO[]> {
    const propertyService = await this.findAll();

    const filteredResult = propertyService.filter(
      (request) => request?.property?.userId === userId,
    );

    return filteredResult;
  }
}
