import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IRoomTypeDoc, RoomTypeSchema } from '@src/schema/room-type.schema';

import {
  CreateRoomTypeDTO,
  FilterRoomTypeDTO,
  RoomTypeDTO,
  UpdateRoomTypeDTO,
} from './room-type.dto';

@Injectable()
export class RoomTypeService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IRoomTypeDoc>('RoomType', RoomTypeSchema);
  }
  async create(createRoomTypeDTO: CreateRoomTypeDTO): Promise<RoomTypeDTO> {
    const roomType = await this.serviceModel.create(createRoomTypeDTO);

    return roomType.toJSON() as RoomTypeDTO;
  }

  async findAll(): Promise<RoomTypeDTO[]> {
    const roomTypesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const roomTypes = roomTypesResult.map((u) => u.toJSON() as RoomTypeDTO);

    return roomTypes;
  }

  async findByFilter(
    filterRoomTypeDTO: FilterRoomTypeDTO,
  ): Promise<RoomTypeDTO[]> {
    const roomTypesResult = await this.serviceModel
      .find({ ...filterRoomTypeDTO, deleted: null })
      .exec();

    const roomTypes = roomTypesResult.map((u) => u.toJSON() as RoomTypeDTO);

    return roomTypes;
  }

  async findOne(id: string): Promise<RoomTypeDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as RoomTypeDTO;
  }

  async update(
    id: string,
    updateRoomTypeDTO: UpdateRoomTypeDTO,
  ): Promise<RoomTypeDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRoomTypeDTO,
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
