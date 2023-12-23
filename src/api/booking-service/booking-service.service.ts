import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  BookingServiceSchema,
  IBookingServiceDoc,
} from '@src/schema/booking-service.schema';

import {
  BookingServiceDTO,
  CreateBookingServiceDTO,
  FilterBookingServiceDTO,
  UpdateBookingServiceDTO,
} from './booking-service.dto';

@Injectable()
export class BookingServiceService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.BookingService ||
      model<IBookingServiceDoc>('BookingService', BookingServiceSchema);
  }
  async create(
    createBookingServiceDTO: CreateBookingServiceDTO,
  ): Promise<BookingServiceDTO> {
    const bookingService = await this.serviceModel.create(
      createBookingServiceDTO,
    );

    return bookingService.toJSON() as BookingServiceDTO;
  }

  async findAll(): Promise<BookingServiceDTO[]> {
    const bookingServicesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const bookingServices = bookingServicesResult.map(
      (u) => u.toJSON() as BookingServiceDTO,
    );

    return bookingServices;
  }

  async findByFilter(
    filterBookingServiceDTO: FilterBookingServiceDTO,
  ): Promise<BookingServiceDTO[]> {
    const bookingServicesResult = await this.serviceModel
      .find({ ...filterBookingServiceDTO, deleted: null })
      .exec();

    const bookingServices = bookingServicesResult.map(
      (u) => u.toJSON() as BookingServiceDTO,
    );

    return bookingServices;
  }

  async findOne(id: string): Promise<BookingServiceDTO> {
    const bookingServiceResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const bookingService: BookingServiceDTO =
      bookingServiceResult.toJSON() as BookingServiceDTO;

    return bookingService;
  }

  async update(
    id: string,
    updateBookingServiceDTO: UpdateBookingServiceDTO,
  ): Promise<BookingServiceDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateBookingServiceDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const bookingService = await this.findOne(id);

    return bookingService;
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
