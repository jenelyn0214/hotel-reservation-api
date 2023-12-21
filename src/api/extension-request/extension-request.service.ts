import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  ExtensionRequestSchema,
  IExtensionRequestDoc,
} from '@src/schema/extension-request.schema';

import {
  CreateExtensionRequestDTO,
  ExtensionRequestDTO,
  FilterExtensionRequestDTO,
  UpdateExtensionRequestDTO,
} from './extension-request.dto';

@Injectable()
export class ExtensionRequestService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.ExtensionRequest ||
      model<IExtensionRequestDoc>('ExtensionRequest', ExtensionRequestSchema);
  }
  async create(
    createExtensionRequestDTO: CreateExtensionRequestDTO,
  ): Promise<ExtensionRequestDTO> {
    const extensionRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        rentId: createExtensionRequestDTO.rentId,
        userId: createExtensionRequestDTO.userId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!extensionRequestResult) {
      const extensionRequest = await this.serviceModel.create(
        createExtensionRequestDTO,
      );

      return extensionRequest.toJSON() as ExtensionRequestDTO;
    } else {
      return extensionRequestResult.toJSON() as ExtensionRequestDTO;
    }
  }

  async findAll(): Promise<ExtensionRequestDTO[]> {
    const extensionRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const extensionRequests = extensionRequestsResult.map(
      (u) => u.toJSON() as ExtensionRequestDTO,
    );

    return extensionRequests;
  }

  async findByFilter(
    filterExtensionRequestDTO: FilterExtensionRequestDTO,
  ): Promise<ExtensionRequestDTO[]> {
    const extensionRequestsResult = await this.serviceModel
      .find({ ...filterExtensionRequestDTO, deleted: null })
      .exec();

    const extensionRequests = extensionRequestsResult.map(
      (u) => u.toJSON() as ExtensionRequestDTO,
    );

    return extensionRequests;
  }

  async findOne(id: string): Promise<ExtensionRequestDTO> {
    const extensionRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const extensionRequest: ExtensionRequestDTO =
      extensionRequestResult.toJSON() as ExtensionRequestDTO;

    return extensionRequest;
  }

  async update(
    id: string,
    updateExtensionRequestDTO: UpdateExtensionRequestDTO,
  ): Promise<ExtensionRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateExtensionRequestDTO,
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

  async getRequestsByPropertyOwner(
    userId: string,
  ): Promise<ExtensionRequestDTO[]> {
    const extensionRequests = await this.findAll();

    const filteredResult = extensionRequests.filter(
      (request) => request.rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }
}
