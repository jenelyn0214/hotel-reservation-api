import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  HallBookingSchema,
  IHallBookingDoc,
} from '@src/schema/hall-booking.schema';

import {
  CreateHallBookingDTO,
  FilterHallBookingDTO,
  HallBookingDTO,
  UpdateHallBookingDTO,
} from './hall-booking.dto';

@Injectable()
export class HallBookingService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.HallBooking ||
      model<IHallBookingDoc>('HallBooking', HallBookingSchema);
  }
  async create(
    createHallBookingDTO: CreateHallBookingDTO,
  ): Promise<HallBookingDTO> {
    const hallBooking = await this.serviceModel.create(createHallBookingDTO);

    return hallBooking.toJSON() as HallBookingDTO;
  }

  async findAll(): Promise<HallBookingDTO[]> {
    const hallBookingsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const hallBookings = hallBookingsResult.map(
      (u) => u.toJSON() as HallBookingDTO,
    );

    return hallBookings;
  }

  async findByFilter(
    filterHallBookingDTO: FilterHallBookingDTO,
  ): Promise<HallBookingDTO[]> {
    const hallBookingsResult = await this.serviceModel
      .find({ ...filterHallBookingDTO, deleted: null })
      .exec();

    const hallBookings = hallBookingsResult.map(
      (u) => u.toJSON() as HallBookingDTO,
    );

    return hallBookings;
  }

  async findOne(id: string): Promise<HallBookingDTO> {
    const hallBookingResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const hallBooking: HallBookingDTO =
      hallBookingResult.toJSON() as HallBookingDTO;

    return hallBooking;
  }

  async update(
    id: string,
    updateHallBookingDTO: UpdateHallBookingDTO,
  ): Promise<HallBookingDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateHallBookingDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const hallBooking = await this.findOne(id);

    return hallBooking;
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
