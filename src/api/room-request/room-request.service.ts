import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { RoomService } from '@src/api/room/room.service';
import { DatabaseService } from '@src/database/database.service';
import { RoomStatusEnum, StatusEnum } from '@src/enums';
import {
  IRoomRequestDoc,
  RoomRequestSchema,
} from '@src/schema/room-request.schema';

import {
  CreateRoomRequestDTO,
  FilterRoomRequestDTO,
  RoomRequestsDTO,
  RoomRequestsWithLogsDTO,
  UpdateRoomRequestDTO,
} from './room-request.dto';

@Injectable()
export class RoomRequestService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly roomService: RoomService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.RoomRequest ||
      model<IRoomRequestDoc>('RoomRequest', RoomRequestSchema);
  }
  async create(
    createRoomRequestDTO: CreateRoomRequestDTO,
  ): Promise<RoomRequestsDTO> {
    const roomRequestResult = await this.serviceModel
      .findOne({
        deleted: null,
        roomId: createRoomRequestDTO.roomId,
        status: StatusEnum.PENDING,
      })
      .exec();

    if (!roomRequestResult) {
      const roomRequest = await this.serviceModel.create(createRoomRequestDTO);

      return roomRequest.toJSON() as RoomRequestsDTO;
    } else {
      return roomRequestResult.toJSON() as RoomRequestsDTO;
    }
  }

  async findAll(): Promise<RoomRequestsDTO[]> {
    const roomRequestsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const roomRequests = roomRequestsResult.map(
      (u) => u.toJSON() as RoomRequestsDTO,
    );

    return roomRequests;
  }

  async findByFilter(
    filterRoomRequestDTO: FilterRoomRequestDTO,
  ): Promise<RoomRequestsDTO[]> {
    const roomRequestsResult = await this.serviceModel
      .find({ ...filterRoomRequestDTO, deleted: null })
      .exec();

    const roomRequests = roomRequestsResult.map(
      (u) => u.toJSON() as RoomRequestsDTO,
    );

    return roomRequests;
  }

  async findAllWithLogs(
    filterRoomRequestDTO: FilterRoomRequestDTO,
  ): Promise<RoomRequestsDTO[]> {
    const roomRequestsResult = await this.serviceModel
      .find({ ...filterRoomRequestDTO, deleted: null })
      .sort({ created: -1 })
      .exec();

    const roomRequests = roomRequestsResult.map(
      (u) => u.toJSON() as RoomRequestsDTO,
    );

    let requestsData: RoomRequestsWithLogsDTO[] = [];

    roomRequests.forEach((item) => {
      const requestIndex = requestsData.findIndex(
        (data) => data.roomId === item.roomId,
      );

      const itemWithLogs: RoomRequestsWithLogsDTO = { ...item, logs: [] };

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

  async findOne(id: string): Promise<RoomRequestsWithLogsDTO> {
    const roomRequestResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const roomRequest: RoomRequestsDTO =
      roomRequestResult.toJSON() as RoomRequestsDTO;

    const roomRequestsLogsResult = await this.serviceModel
      .find({
        deleted: null,
        status: { $ne: StatusEnum.PENDING },
        propertyId: roomRequest.propertyId,
      })
      .sort({ created: -1 })
      .exec();

    const roomRequestsLogs = roomRequestsLogsResult.map(
      (u) => u.toJSON() as RoomRequestsDTO,
    );

    return {
      ...roomRequest,
      logs: roomRequestsLogs,
    } as RoomRequestsWithLogsDTO;
  }

  async update(
    id: string,
    updateRoomRequestDTO: UpdateRoomRequestDTO,
  ): Promise<RoomRequestsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRoomRequestDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const roomRequest = await this.findOne(id);

    if (
      updateRoomRequestDTO.status &&
      updateRoomRequestDTO.status !== StatusEnum.PENDING
    ) {
      await this.roomService.update(roomRequest.roomId, {
        status: updateRoomRequestDTO.status as unknown as RoomStatusEnum,
      });
    }

    const updatedRoomRequest = await this.findOne(id);

    return updatedRoomRequest;
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
