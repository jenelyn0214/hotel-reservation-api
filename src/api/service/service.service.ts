import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IServiceDoc, ServiceSchema } from '@src/schema/service.schema';

import {
  CreateServiceDTO,
  FilterServiceDTO,
  ServiceDTO,
  UpdateServiceDTO,
} from './service.dto';

@Injectable()
export class ServiceService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IServiceDoc>('Service', ServiceSchema);
  }
  async create(createServiceDTO: CreateServiceDTO): Promise<ServiceDTO> {
    const service = await this.serviceModel.create(createServiceDTO);

    return service.toJSON() as ServiceDTO;
  }

  async findAll(): Promise<ServiceDTO[]> {
    const servicesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const services = servicesResult.map((u) => u.toJSON() as ServiceDTO);

    return services;
  }

  async findByFilter(
    filterServiceDTO: FilterServiceDTO,
  ): Promise<ServiceDTO[]> {
    const servicesResult = await this.serviceModel
      .find({ ...filterServiceDTO, deleted: null })
      .exec();

    const services = servicesResult.map((u) => u.toJSON() as ServiceDTO);

    return services;
  }

  async findOne(id: string): Promise<ServiceDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as ServiceDTO;
  }

  async update(
    id: string,
    updateServiceDTO: UpdateServiceDTO,
  ): Promise<ServiceDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateServiceDTO,
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
