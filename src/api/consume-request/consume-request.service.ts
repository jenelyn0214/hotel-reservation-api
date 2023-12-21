import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  ConsumeRequestSchema,
  IConsumeRequestDoc,
} from '@src/schema/consume-request.schema';

import {
  ConsumeRequestDTO,
  CreateConsumeRequestDTO,
  FilterConsumeRequestDTO,
  UpdateConsumeRequestDTO,
} from './consume-request.dto';

@Injectable()
export class ConsumeRequestService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.ConsumeRequest ||
      model<IConsumeRequestDoc>('ConsumeRequest', ConsumeRequestSchema);
  }
  async create(
    createConsumeRequestDTO: CreateConsumeRequestDTO,
  ): Promise<ConsumeRequestDTO> {
    const consumeRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        rentId: createConsumeRequestDTO.rentId,
        userId: createConsumeRequestDTO.userId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!consumeRequestResult) {
      const consumeRequest = await this.serviceModel.create(
        createConsumeRequestDTO,
      );

      return consumeRequest.toJSON() as ConsumeRequestDTO;
    } else {
      return consumeRequestResult.toJSON() as ConsumeRequestDTO;
    }
  }

  async findAll(): Promise<ConsumeRequestDTO[]> {
    const consumeRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const consumeRequests = consumeRequestsResult.map(
      (u) => u.toJSON() as ConsumeRequestDTO,
    );

    return consumeRequests;
  }

  async findByFilter(
    filterConsumeRequestDTO: FilterConsumeRequestDTO,
  ): Promise<ConsumeRequestDTO[]> {
    const consumeRequestsResult = await this.serviceModel
      .find({ ...filterConsumeRequestDTO, deleted: null })
      .exec();

    const consumeRequests = consumeRequestsResult.map(
      (u) => u.toJSON() as ConsumeRequestDTO,
    );

    return consumeRequests;
  }

  async findOne(id: string): Promise<ConsumeRequestDTO> {
    const consumeRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const consumeRequest: ConsumeRequestDTO =
      consumeRequestResult.toJSON() as ConsumeRequestDTO;

    return consumeRequest;
  }

  async update(
    id: string,
    updateConsumeRequestDTO: UpdateConsumeRequestDTO,
  ): Promise<ConsumeRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateConsumeRequestDTO,
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
  ): Promise<ConsumeRequestDTO[]> {
    const consumeRequests = await this.findAll();

    const filteredResult = consumeRequests.filter(
      (request) => request.rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }
}
