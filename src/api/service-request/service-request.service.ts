import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { ServiceService } from '@src/api/service/service.service';
import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  IServiceRequestDoc,
  ServiceRequestSchema,
} from '@src/schema/service-request.schema';

import {
  CreateServiceRequestDTO,
  FilterServiceRequestDTO,
  ServiceRequestsDTO,
  UpdateServiceRequestDTO,
} from './service-request.dto';

@Injectable()
export class ServiceRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly serviceService: ServiceService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.ServiceRequest ||
      model<IServiceRequestDoc>('ServiceRequest', ServiceRequestSchema);
  }
  async create(
    createServiceRequestDTO: CreateServiceRequestDTO,
  ): Promise<ServiceRequestsDTO> {
    const serviceRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        serviceId: createServiceRequestDTO.serviceId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!serviceRequestResult) {
      const serviceRequest = await this.serviceModel.create(
        createServiceRequestDTO,
      );

      return serviceRequest.toJSON() as ServiceRequestsDTO;
    } else {
      return serviceRequestResult.toJSON() as ServiceRequestsDTO;
    }
  }

  async findAll(): Promise<ServiceRequestsDTO[]> {
    const serviceRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const serviceRequests = serviceRequestsResult.map(
      (u) => u.toJSON() as ServiceRequestsDTO,
    );

    return serviceRequests;
  }

  async findByFilter(
    filterServiceRequestDTO: FilterServiceRequestDTO,
  ): Promise<ServiceRequestsDTO[]> {
    const serviceRequestsResult = await this.serviceModel
      .find({ ...filterServiceRequestDTO, deleted: null })
      .exec();

    const serviceRequests = serviceRequestsResult.map(
      (u) => u.toJSON() as ServiceRequestsDTO,
    );

    return serviceRequests;
  }

  async findOne(id: string): Promise<ServiceRequestsDTO> {
    const serviceRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const serviceRequest: ServiceRequestsDTO =
      serviceRequestResult.toJSON() as ServiceRequestsDTO;

    return serviceRequest;
  }

  async update(
    id: string,
    updateServiceRequestDTO: UpdateServiceRequestDTO,
  ): Promise<ServiceRequestsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateServiceRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const serviceRequest = await this.findOne(id);

    if (
      updateServiceRequestDTO.status &&
      updateServiceRequestDTO.status === StatusEnum.APPROVED
    ) {
      await this.serviceService.update(serviceRequest.serviceId, {
        status: StatusEnum.APPROVED,
      });
    }

    return serviceRequest;
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
