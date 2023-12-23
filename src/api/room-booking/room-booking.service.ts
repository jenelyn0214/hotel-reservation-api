import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  IRoomBookingDoc,
  RoomBookingSchema,
} from '@src/schema/room-booking.schema';

import {
  CreateRoomBookingDTO,
  FilterRoomBookingDTO,
  RoomBookingDTO,
  UpdateRoomBookingDTO,
} from './room-booking.dto';

@Injectable()
export class RoomBookingService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.RoomBooking ||
      model<IRoomBookingDoc>('RoomBooking', RoomBookingSchema);
  }
  async create(
    createRoomBookingDTO: CreateRoomBookingDTO,
  ): Promise<RoomBookingDTO> {
    const roomBooking = await this.serviceModel.create(createRoomBookingDTO);

    return roomBooking.toJSON() as RoomBookingDTO;
  }

  async findAll(): Promise<RoomBookingDTO[]> {
    const roomBookingsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const roomBookings = roomBookingsResult.map(
      (u) => u.toJSON() as RoomBookingDTO,
    );

    return roomBookings;
  }

  async findByFilter(
    filterRoomBookingDTO: FilterRoomBookingDTO,
  ): Promise<RoomBookingDTO[]> {
    const roomBookingsResult = await this.serviceModel
      .find({ ...filterRoomBookingDTO, deleted: null })
      .exec();

    const roomBookings = roomBookingsResult.map(
      (u) => u.toJSON() as RoomBookingDTO,
    );

    return roomBookings;
  }

  async findOne(id: string): Promise<RoomBookingDTO> {
    const roomBookingResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const roomBooking: RoomBookingDTO =
      roomBookingResult.toJSON() as RoomBookingDTO;

    return roomBooking;
  }

  async update(
    id: string,
    updateRoomBookingDTO: UpdateRoomBookingDTO,
  ): Promise<RoomBookingDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRoomBookingDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const roomBooking = await this.findOne(id);

    return roomBooking;
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
