import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { BusinessService } from '@src/api/business/business.service';
import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  BusinessRequestSchema,
  IBusinessRequestDoc,
} from '@src/schema/business-request.schema';

import {
  BusinessRequestsDTO,
  CreateBusinessRequestDTO,
  FilterBusinessRequestDTO,
  UpdateBusinessRequestDTO,
} from './business-request.dto';

@Injectable()
export class BusinessRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly businessService: BusinessService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.BusinessRequest ||
      model<IBusinessRequestDoc>('BusinessRequest', BusinessRequestSchema);
  }
  async create(
    createBusinessRequestDTO: CreateBusinessRequestDTO,
  ): Promise<BusinessRequestsDTO> {
    const businessRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        businessId: createBusinessRequestDTO.businessId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!businessRequestResult) {
      const businessRequest = await this.serviceModel.create(
        createBusinessRequestDTO,
      );

      return businessRequest.toJSON() as BusinessRequestsDTO;
    } else {
      return businessRequestResult.toJSON() as BusinessRequestsDTO;
    }
  }

  async findAll(): Promise<BusinessRequestsDTO[]> {
    const businessRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const businessRequests = businessRequestsResult.map(
      (u) => u.toJSON() as BusinessRequestsDTO,
    );

    return businessRequests;
  }

  async findByFilter(
    filterBusinessRequestDTO: FilterBusinessRequestDTO,
  ): Promise<BusinessRequestsDTO[]> {
    const businessRequestsResult = await this.serviceModel
      .find({ ...filterBusinessRequestDTO, deleted: null })
      .exec();

    const businessRequests = businessRequestsResult.map(
      (u) => u.toJSON() as BusinessRequestsDTO,
    );

    return businessRequests;
  }

  async findOne(id: string): Promise<BusinessRequestsDTO> {
    const businessRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const businessRequest: BusinessRequestsDTO =
      businessRequestResult.toJSON() as BusinessRequestsDTO;

    return businessRequest;
  }

  async update(
    id: string,
    updateBusinessRequestDTO: UpdateBusinessRequestDTO,
  ): Promise<BusinessRequestsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateBusinessRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const businessRequest = await this.findOne(id);

    if (
      updateBusinessRequestDTO.status &&
      updateBusinessRequestDTO.status === StatusEnum.APPROVED
    ) {
      await this.businessService.update(businessRequest.businessId, {
        status: StatusEnum.APPROVED,
      });
    }

    return businessRequest;
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
