import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { PropertyService } from '@src/api/property/property.service';
import { RoomRequestService } from '@src/api/room-request/room-request.service';
import { DatabaseService } from '@src/database/database.service';
import { PropertyStatusEnum, StatusEnum } from '@src/enums';
import {
  IPropertyRequestDoc,
  PropertyRequestSchema,
} from '@src/schema/property-request.schema';

import {
  CreatePropertyRequestDTO,
  FilterPropertyRequestDTO,
  PropertyRequestsDTO,
  PropertyRequestsWithLogsDTO,
  UpdatePropertyRequestDTO,
} from './property-request.dto';

@Injectable()
export class PropertyRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly propertyService: PropertyService,
    private readonly roomRequestService: RoomRequestService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.PropertyRequest ||
      model<IPropertyRequestDoc>('PropertyRequest', PropertyRequestSchema);
  }
  async create(
    createPropertyRequestDTO: CreatePropertyRequestDTO,
  ): Promise<PropertyRequestsDTO> {
    const propertyRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        propertyId: createPropertyRequestDTO.propertyId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!propertyRequestResult) {
      const propertyRequest = await this.serviceModel.create(
        createPropertyRequestDTO,
      );

      return propertyRequest.toJSON() as PropertyRequestsDTO;
    } else {
      return propertyRequestResult.toJSON() as PropertyRequestsDTO;
    }
  }

  async findAll(): Promise<PropertyRequestsDTO[]> {
    const propertyRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const propertyRequests = propertyRequestsResult.map(
      (u) => u.toJSON() as PropertyRequestsDTO,
    );

    return propertyRequests;
  }

  async findByFilter(
    filterPropertyRequestDTO: FilterPropertyRequestDTO,
  ): Promise<PropertyRequestsDTO[]> {
    const propertyRequestsResult = await this.serviceModel
      .find({ ...filterPropertyRequestDTO, deleted: null })
      .exec();

    return propertyRequestsResult.map((u) => u.toJSON() as PropertyRequestsDTO);
  }

  async findAllWithLogs(): Promise<PropertyRequestsWithLogsDTO[]> {
    const propertyRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .sort({ created: -1 })
      .exec();

    const propertyRequests = propertyRequestsResult.map(
      (u) => u.toJSON() as PropertyRequestsDTO,
    );

    let requestsData: PropertyRequestsWithLogsDTO[] = [];

    propertyRequests.forEach((item) => {
      const requestIndex = requestsData.findIndex(
        (data) => data.propertyId === item.propertyId,
      );

      const itemWithLogs: PropertyRequestsWithLogsDTO = { ...item, logs: [] };

      if (requestIndex === -1) {
        requestsData = [...requestsData, itemWithLogs];
      } else {
        requestsData[requestIndex]['logs'] = [
          ...requestsData[requestIndex]['logs'],
          item,
        ];
      }
    });

    return requestsData;
  }

  async findOne(id: string): Promise<PropertyRequestsWithLogsDTO> {
    const propertyRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const propertyRequest: PropertyRequestsDTO =
      propertyRequestResult.toJSON() as PropertyRequestsDTO;

    const propertyRequestsLogsResult = await this.serviceModel
      .find({
        deleted: null,
        status: { $ne: StatusEnum.PENDING },
        propertyId: propertyRequest.propertyId,
      })
      .sort({ created: -1 })
      .exec();

    const propertyRequestsLogs = propertyRequestsLogsResult.map(
      (u) => u.toJSON() as PropertyRequestsDTO,
    );

    return {
      ...propertyRequest,
      logs: propertyRequestsLogs,
    } as PropertyRequestsWithLogsDTO;
  }

  async update(
    id: string,
    updatePropertyRequestDTO: UpdatePropertyRequestDTO,
  ): Promise<PropertyRequestsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updatePropertyRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const propertyRequest = await this.findOne(id);

    if (
      updatePropertyRequestDTO.status &&
      updatePropertyRequestDTO.status !== StatusEnum.PENDING
    ) {
      await this.propertyService.update(propertyRequest.propertyId, {
        status:
          updatePropertyRequestDTO.status as unknown as PropertyStatusEnum,
      });
    }

    const updatedPropertyRequest = await this.findOne(id);

    return updatedPropertyRequest;
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
