import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  CancelContractStatusEnum,
  StatusDescEnum,
  StatusLogEnum,
} from '@src/enums';
import {
  CancelContractRequestSchema,
  ICancelContractRequestDoc,
} from '@src/schema/cancel-contract-request.schema';

import {
  CancelContractRequestDTO,
  CancelContractRequestLogsDTO,
  CreateCancelContractRequestDTO,
  FilterCancelContractRequestDTO,
  UpdateCancelContractRequestDTO,
} from './cancel-contract-request.dto';

@Injectable()
export class CancelContractRequestService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.CancelContractRequest ||
      model<ICancelContractRequestDoc>(
        'CancelContractRequest',
        CancelContractRequestSchema,
      );
  }
  async create(
    createCancelContractRequestDTO: CreateCancelContractRequestDTO,
  ): Promise<CancelContractRequestDTO> {
    const cancelContractRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        rentId: createCancelContractRequestDTO.rentId,
        userId: createCancelContractRequestDTO.userId,
        status: {
          $nin: [
            CancelContractStatusEnum.ADMIN_REJECTED,
            CancelContractStatusEnum.ADMIN_APPROVED,
            CancelContractStatusEnum.APPROVED,
          ],
        },
      })
      .exec();

    if (!cancelContractRequestResult) {
      const cancelContractRequestResult = await this.serviceModel.create(
        createCancelContractRequestDTO,
      );

      const cancelContractRequestData =
        cancelContractRequestResult.toJSON() as CancelContractRequestDTO;

      const cancelContractRequest = await this.findOne(
        cancelContractRequestData.id,
      );

      this.createLogs(cancelContractRequest);

      return cancelContractRequestData;
    } else {
      return cancelContractRequestResult.toJSON() as CancelContractRequestDTO;
    }
  }

  async findAll(): Promise<CancelContractRequestDTO[]> {
    const cancelContractRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const cancelContractRequests = cancelContractRequestsResult.map(
      (u) => u.toJSON() as CancelContractRequestDTO,
    );

    return cancelContractRequests;
  }

  async findByFilter(
    filterCancelContractRequestDTO: FilterCancelContractRequestDTO,
  ): Promise<CancelContractRequestDTO[]> {
    const cancelContractRequestsResult = await this.serviceModel
      .find({ ...filterCancelContractRequestDTO, deleted: null })
      .exec();

    const cancelContractRequests = cancelContractRequestsResult.map(
      (u) => u.toJSON() as CancelContractRequestDTO,
    );

    return cancelContractRequests;
  }

  async findOne(id: string): Promise<CancelContractRequestDTO> {
    const cancelContractRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const cancelContractRequest: CancelContractRequestDTO =
      cancelContractRequestResult.toJSON() as CancelContractRequestDTO;

    return cancelContractRequest;
  }

  async update(
    id: string,
    updateCancelContractRequestDTO: UpdateCancelContractRequestDTO,
  ): Promise<CancelContractRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateCancelContractRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const cancelContractRequestData = await this.findOne(id);

    if (updateCancelContractRequestDTO.status) {
      this.createLogs(cancelContractRequestData);
    }

    return cancelContractRequestData;
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
  ): Promise<CancelContractRequestDTO[]> {
    const cancelContractRequests = await this.findAll();

    const filteredResult = cancelContractRequests.filter(
      (request) => request.rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }

  async createLogs(cancelContractRequestDTO: CancelContractRequestDTO) {
    const statusDesc = StatusDescEnum[cancelContractRequestDTO.status];
    const log = StatusLogEnum[cancelContractRequestDTO.status].replaceAll(
      '{RenterName}',
      cancelContractRequestDTO.user.fullName,
    );

    const logsDTO: CancelContractRequestLogsDTO = {
      statusDesc,
      log,
      status: cancelContractRequestDTO.status,
    };

    await this.serviceModel
      .updateOne(
        { _id: cancelContractRequestDTO.id },
        {
          $addToSet: {
            logs: logsDTO,
          },
        },
      )
      .exec();
  }
}
