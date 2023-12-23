import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IOrderMenuDoc, OrderMenuSchema } from '@src/schema/order-menu.schema';

import {
  CreateOrderMenuDTO,
  FilterOrderMenuDTO,
  OrderMenuDTO,
  UpdateOrderMenuDTO,
} from './order-menu.dto';

@Injectable()
export class OrderMenuService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.OrderMenu ||
      model<IOrderMenuDoc>('OrderMenu', OrderMenuSchema);
  }
  async create(createOrderMenuDTO: CreateOrderMenuDTO): Promise<OrderMenuDTO> {
    const roomBooking = await this.serviceModel.create(createOrderMenuDTO);

    return roomBooking.toJSON() as OrderMenuDTO;
  }

  async findAll(): Promise<OrderMenuDTO[]> {
    const roomBookingsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const roomBookings = roomBookingsResult.map(
      (u) => u.toJSON() as OrderMenuDTO,
    );

    return roomBookings;
  }

  async findByFilter(
    filterOrderMenuDTO: FilterOrderMenuDTO,
  ): Promise<OrderMenuDTO[]> {
    const roomBookingsResult = await this.serviceModel
      .find({ ...filterOrderMenuDTO, deleted: null })
      .exec();

    const roomBookings = roomBookingsResult.map(
      (u) => u.toJSON() as OrderMenuDTO,
    );

    return roomBookings;
  }

  async findOne(id: string): Promise<OrderMenuDTO> {
    const roomBookingResult = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    const roomBooking: OrderMenuDTO =
      roomBookingResult.toJSON() as OrderMenuDTO;

    return roomBooking;
  }

  async update(
    id: string,
    updateOrderMenuDTO: UpdateOrderMenuDTO,
  ): Promise<OrderMenuDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateOrderMenuDTO,
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
