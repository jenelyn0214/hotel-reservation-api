import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { CustomerSchema, ICustomerDoc } from '@src/schema/customer.schema';

import {
  CreateCustomerDTO,
  CustomerDTO,
  FilterCustomerDTO,
  UpdateCustomerDTO,
} from './customer.dto';

@Injectable()
export class CustomerService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<ICustomerDoc>('Customer', CustomerSchema);
  }
  async create(createCustomerDTO: CreateCustomerDTO): Promise<CustomerDTO> {
    const roomType = await this.serviceModel.create(createCustomerDTO);

    return roomType.toJSON() as CustomerDTO;
  }

  async findAll(): Promise<CustomerDTO[]> {
    const roomTypesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const roomTypes = roomTypesResult.map((u) => u.toJSON() as CustomerDTO);

    return roomTypes;
  }

  async findByFilter(
    filterCustomerDTO: FilterCustomerDTO,
  ): Promise<CustomerDTO[]> {
    const roomTypesResult = await this.serviceModel
      .find({ ...filterCustomerDTO, deleted: null })
      .exec();

    const roomTypes = roomTypesResult.map((u) => u.toJSON() as CustomerDTO);

    return roomTypes;
  }

  async findOne(id: string): Promise<CustomerDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as CustomerDTO;
  }

  async update(
    id: string,
    updateCustomerDTO: UpdateCustomerDTO,
  ): Promise<CustomerDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateCustomerDTO,
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
