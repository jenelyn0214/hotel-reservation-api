import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IRoomDoc, RoomSchema } from '@src/schema/room.schema';

import {
  CreateRoomDTO,
  FilterRoomDTO,
  RoomDTO,
  UpdateRoomDTO,
} from './room.dto';

@Injectable()
export class RoomService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IRoomDoc>('Room', RoomSchema);
  }
  async create(createRoomDTO: CreateRoomDTO): Promise<RoomDTO> {
    const room = await this.serviceModel.create(createRoomDTO);

    return room.toJSON() as RoomDTO;
  }

  async findAll(): Promise<RoomDTO[]> {
    const roomsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const rooms = roomsResult.map((u) => u.toJSON() as RoomDTO);

    return rooms;
  }

  async findByFilter(filterRoomDTO: FilterRoomDTO): Promise<RoomDTO[]> {
    const roomsResult = await this.serviceModel
      .find({ ...filterRoomDTO, deleted: null })
      .exec();

    const rooms = roomsResult.map((u) => u.toJSON() as RoomDTO);

    return rooms;
  }

  async findOne(id: string): Promise<RoomDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as RoomDTO;
  }

  async update(id: string, updateRoomDTO: UpdateRoomDTO): Promise<RoomDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRoomDTO,
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
}
