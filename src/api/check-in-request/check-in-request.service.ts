import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { StatusEnum } from '@src/enums';
import {
  CheckInRequestSchema,
  ICheckInRequestDoc,
} from '@src/schema/room-booking.schema';
import { toPlainObject } from '@src/util/dto-util';

import {
  CheckInRequestDTO,
  CreateCheckInRequestDTO,
  FilterCheckInRequestDTO,
  UpdateCheckInRequestDTO,
} from './check-in-request.dto';

@Injectable()
export class CheckInRequestService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.CheckInRequest ||
      model<ICheckInRequestDoc>('CheckInRequest', CheckInRequestSchema);
  }
  async create(
    createCheckInRequestDTO: CreateCheckInRequestDTO,
  ): Promise<CheckInRequestDTO> {
    const checkInRequestResult = await this.serviceModel
      .findOne<CheckInRequestDTO>({
        deleted: null,
        roomId: createCheckInRequestDTO.roomId,
        rentId: createCheckInRequestDTO.rentId,
        status: { $in: [StatusEnum.PENDING, StatusEnum.APPROVED] },
      })
      .exec();

    if (!checkInRequestResult) {
      const checkInRequest = await this.serviceModel.create(
        createCheckInRequestDTO,
      );

      return toPlainObject<CheckInRequestDTO>(checkInRequest);
    } else {
      return toPlainObject<CheckInRequestDTO>(checkInRequestResult);
    }
  }

  async findAll(): Promise<CheckInRequestDTO[]> {
    const checkInRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const checkInRequests = checkInRequestsResult.map((u) =>
      toPlainObject<CheckInRequestDTO>(u),
    );

    return checkInRequests;
  }

  async findByFilter(
    filterCheckInRequestDTO: FilterCheckInRequestDTO,
  ): Promise<CheckInRequestDTO[]> {
    const checkInRequestsResult = await this.serviceModel
      .find({ ...filterCheckInRequestDTO, deleted: null })
      .exec();

    const checkInRequests = checkInRequestsResult.map((u) =>
      toPlainObject<CheckInRequestDTO>(u),
    );

    return checkInRequests;
  }

  async findOne(id: string): Promise<CheckInRequestDTO> {
    return await this.serviceModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateCheckInRequestDTO: UpdateCheckInRequestDTO,
  ): Promise<CheckInRequestDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateCheckInRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedCheckInRequest = await this.findOne(id);

    return updatedCheckInRequest;
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
  ): Promise<CheckInRequestDTO[]> {
    const checkInRequests = await this.findAll();

    const filteredResult = checkInRequests.filter(
      (request) => request.rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }
}
