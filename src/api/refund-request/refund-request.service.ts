import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { RefundStatusEnum, StatusDescEnum, StatusLogEnum } from '@src/enums';
import {
  IRefundRequestDoc,
  RefundRequestSchema,
} from '@src/schema/refund-request.schema';

import {
  CreateRefundRequestDTO,
  FilterRefundRequestDTO,
  RefundRequestDTO,
  RefundRequestLogsDTO,
  UpdateRefundRequestDTO,
} from './refund-request.dto';

@Injectable()
export class RefundRequestService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.RefundRequest ||
      model<IRefundRequestDoc>('RefundRequest', RefundRequestSchema);
  }
  async create(
    createRefundRequestDTO: CreateRefundRequestDTO,
  ): Promise<RefundRequestDTO> {
    const refundRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        rentId: createRefundRequestDTO.rentId,
        userId: createRefundRequestDTO.userId,
        status: {
          $nin: [
            RefundStatusEnum.ADMIN_REJECTED,
            RefundStatusEnum.ADMIN_APPROVED,
            RefundStatusEnum.APPROVED,
          ],
        },
      })
      .exec();

    if (!refundRequestResult) {
      const refundRequestResult = await this.serviceModel.create(
        createRefundRequestDTO,
      );

      const refundRequestData =
        refundRequestResult.toJSON() as RefundRequestDTO;

      const refundRequest = await this.findOne(refundRequestData.id);

      this.createLogs(refundRequest);

      return refundRequestData;
    } else {
      return refundRequestResult.toJSON() as RefundRequestDTO;
    }
  }

  async findAll(): Promise<RefundRequestDTO[]> {
    const refundRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const refundRequests = refundRequestsResult.map(
      (u) => u.toJSON() as RefundRequestDTO,
    );

    return refundRequests;
  }

  async findByFilter(
    filterRefundRequestDTO: FilterRefundRequestDTO,
  ): Promise<RefundRequestDTO[]> {
    const refundRequestsResult = await this.serviceModel
      .find({ ...filterRefundRequestDTO, deleted: null })
      .exec();

    const refundRequests = refundRequestsResult.map(
      (u) => u.toJSON() as RefundRequestDTO,
    );

    return refundRequests;
  }

  async findOne(id: string): Promise<RefundRequestDTO> {
    const refundRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const refundRequest: RefundRequestDTO =
      refundRequestResult.toJSON() as RefundRequestDTO;

    return refundRequest;
  }

  async update(
    id: string,
    updateRefundRequestDTO: UpdateRefundRequestDTO,
  ): Promise<RefundRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRefundRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const refundRequestData = await this.findOne(id);

    if (updateRefundRequestDTO.status) {
      this.createLogs(refundRequestData);
    }

    return refundRequestData;
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

  async createLogs(refundRequestDTO: RefundRequestDTO) {
    const statusDesc = StatusDescEnum[refundRequestDTO.status];

    const log = StatusLogEnum[refundRequestDTO.status].replaceAll(
      '{RenterName}',
      refundRequestDTO.user.fullName,
    );

    const logsDTO: RefundRequestLogsDTO = {
      statusDesc,
      log,
      status: refundRequestDTO.status,
    };

    await this.serviceModel
      .updateOne(
        { _id: refundRequestDTO.id },
        {
          $addToSet: {
            logs: logsDTO,
          },
        },
      )
      .exec();
  }

  async getRequestsByPropertyOwner(
    userId: string,
  ): Promise<RefundRequestDTO[]> {
    const refundRequests = await this.findAll();

    const filteredResult = refundRequests.filter(
      (request) => request.rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }
}
