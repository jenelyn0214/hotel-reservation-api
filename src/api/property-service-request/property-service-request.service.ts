import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  IPropertyServiceRequestDoc,
  PropertyServiceRequestSchema,
} from '@src/schema/property-service-request.schema';

import {
  CreatePropertyServiceRequestDTO,
  FilterPropertyServiceRequestDTO,
  PropertyServiceRequestsDTO,
  PropertyServiceRequestsWithLogsDTO,
  UpdatePropertyServiceRequestDTO,
} from './property-service-request.dto';

@Injectable()
export class PropertyServiceRequestService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.PropertyService ||
      model<IPropertyServiceRequestDoc>(
        'PropertyServiceRequest',
        PropertyServiceRequestSchema,
      );
  }
  async create(
    createPropertyServiceRequestDTO: CreatePropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO> {
    const propertyServiceRequest = await this.serviceModel.create(
      createPropertyServiceRequestDTO,
    );

    return propertyServiceRequest.toJSON() as PropertyServiceRequestsDTO;
  }

  async findAll(): Promise<PropertyServiceRequestsDTO[]> {
    const propertyServiceRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const propertyServiceRequests = propertyServiceRequestsResult.map(
      (u) => u.toJSON() as PropertyServiceRequestsDTO,
    );

    return propertyServiceRequests;
  }

  async findByFilter(
    filterPropertyServiceRequestDTO: FilterPropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO[]> {
    const propertyServiceRequestsResult = await this.serviceModel
      .find({ ...filterPropertyServiceRequestDTO, deleted: null })
      .exec();

    const propertyServiceRequests = propertyServiceRequestsResult.map(
      (u) => u.toJSON() as PropertyServiceRequestsDTO,
    );

    return propertyServiceRequests;
  }

  async findAllWithLogs(
    filterPropertyServiceRequestDTO: FilterPropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO[]> {
    const propertyServiceRequestsResult = await this.serviceModel
      .find({ ...filterPropertyServiceRequestDTO, deleted: null })
      .sort({ created: -1 })
      .exec();

    const propertyServiceRequests = propertyServiceRequestsResult.map(
      (u) => u.toJSON() as PropertyServiceRequestsDTO,
    );

    let requestsData: PropertyServiceRequestsWithLogsDTO[] = [];

    propertyServiceRequests.forEach((item) => {
      const requestIndex = requestsData.findIndex(
        (data) => data.propertyServiceId === item.propertyServiceId,
      );

      const itemWithLogs: PropertyServiceRequestsWithLogsDTO = {
        ...item,
        logs: [],
      };

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

  async findOne(id: string): Promise<PropertyServiceRequestsWithLogsDTO> {
    const propertyServiceRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const propertyServiceRequest: PropertyServiceRequestsDTO =
      propertyServiceRequestResult.toJSON() as PropertyServiceRequestsDTO;

    const propertyServiceRequestsLogsResult = await this.serviceModel
      .find({
        deleted: null,
        status: { $ne: StatusEnum.PENDING },
        propertyId: propertyServiceRequest.propertyServiceId,
      })
      .sort({ created: -1 })
      .exec();

    const propertyServiceRequestsLogs = propertyServiceRequestsLogsResult.map(
      (u) => u.toJSON() as PropertyServiceRequestsDTO,
    );

    return {
      ...propertyServiceRequest,
      logs: propertyServiceRequestsLogs,
    } as PropertyServiceRequestsWithLogsDTO;
  }

  async update(
    id: string,
    updatePropertyServiceRequestDTO: UpdatePropertyServiceRequestDTO,
  ): Promise<PropertyServiceRequestsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updatePropertyServiceRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedPropertyServiceRequest = await this.findOne(id);

    return updatedPropertyServiceRequest;
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

  async getPropertyServiceRequestByPropertyOwner(
    userId: string,
  ): Promise<PropertyServiceRequestsDTO[]> {
    const propertyServiceRequest = await this.findAll();

    const filteredResult = propertyServiceRequest.filter(
      (request) => request?.propertyService?.property?.userId === userId,
    );

    return filteredResult;
  }
}
