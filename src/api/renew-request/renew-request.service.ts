import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import {
  PropertyManagementDTO,
  PropertyManagementItemDTO,
} from '@src/api/property-management/property-management.dto';
import { PropertyManagementService } from '@src/api/property-management/property-management.service';
import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  IRenewRequestDoc,
  RenewRequestSchema,
} from '@src/schema/renew-request.schema';

import {
  CreateRenewRequestDTO,
  FilterRenewRequestDTO,
  RenewRequestDTO,
  UpdateRenewRequestDTO,
} from './renew-request.dto';

@Injectable()
export class RenewRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly propertyManagementService: PropertyManagementService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.RenewRequest ||
      model<IRenewRequestDoc>('RenewRequest', RenewRequestSchema);
  }
  async create(
    createRenewRequestDTO: CreateRenewRequestDTO,
  ): Promise<RenewRequestDTO> {
    const renewRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        rentId: createRenewRequestDTO.rentId,
        userId: createRenewRequestDTO.userId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!renewRequestResult) {
      const renewRequest = await this.serviceModel.create(
        createRenewRequestDTO,
      );

      const renewRequestData: RenewRequestDTO =
        renewRequest.toJSON() as RenewRequestDTO;

      const updatedData = await this.updatePropertyManagement(
        renewRequestData.id,
      );

      return updatedData;
    } else {
      return renewRequestResult.toJSON() as RenewRequestDTO;
    }
  }

  async findAll(): Promise<RenewRequestDTO[]> {
    const renewRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const renewRequests = renewRequestsResult.map(
      (u) => u.toJSON() as RenewRequestDTO,
    );

    return renewRequests;
  }

  async findByFilter(
    filterRenewRequestDTO: FilterRenewRequestDTO,
  ): Promise<RenewRequestDTO[]> {
    const renewRequestsResult = await this.serviceModel
      .find({ ...filterRenewRequestDTO, deleted: null })
      .exec();

    const renewRequests = renewRequestsResult.map(
      (u) => u.toJSON() as RenewRequestDTO,
    );

    return renewRequests;
  }

  async findOne(id: string): Promise<RenewRequestDTO> {
    const renewRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const renewRequest: RenewRequestDTO =
      renewRequestResult.toJSON() as RenewRequestDTO;

    return renewRequest;
  }

  async update(
    id: string,
    updateRenewRequestDTO: UpdateRenewRequestDTO,
  ): Promise<RenewRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRenewRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedData = await this.updatePropertyManagement(id);

    return updatedData;
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

  async getRequestsByPropertyOwner(userId: string): Promise<RenewRequestDTO[]> {
    const renewRequests = await this.findAll();

    const filteredResult = renewRequests.filter(
      (request) => request.rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }

  getPropertyManagement = async (data: RenewRequestDTO) => {
    let result: RenewRequestDTO = {
      ...data,
    };

    const propertyManagement: PropertyManagementDTO =
      await this.propertyManagementService.findAll();

    if (propertyManagement) {
      const minimumStay: PropertyManagementItemDTO =
        propertyManagement?.durationStay?.find(
          (item) => item.id === data.minimumStayId,
        );

      result = {
        ...result,
        minimumStay,
      };
    }

    return result;
  };

  updatePropertyManagement = async (id: string): Promise<RenewRequestDTO> => {
    const renewRequest: RenewRequestDTO = await this.findOne(id);

    const { minimumStay } = await this.getPropertyManagement(renewRequest);

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          minimumStay,
        },
      )
      .exec();

    return {
      ...renewRequest,
      minimumStay,
    };
  };
}
