import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { QueueService } from '@src/api/queue/queue.service';
import { DatabaseService } from '@src/database/database.service';
import { OrderStatusEnum, QueueStatusEnum } from '@src/enums';
import { IOrderDoc, OrderSchema } from '@src/schema/order.schema';

import {
  CreateOrderDTO,
  FilterOrderDTO,
  OrderDTO,
  UpdateOrderDTO,
} from './order.dto';

@Injectable()
export class OrderService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly queueService: QueueService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.Order ||
      model<IOrderDoc>('Order', OrderSchema);
  }
  async create(createOrderDTO: CreateOrderDTO): Promise<OrderDTO> {
    const order = await this.serviceModel.create(createOrderDTO);

    const data = order.toJSON() as OrderDTO;

    if (data.queueId) {
      await this.queueService.update(data.queueId, {
        status: QueueStatusEnum.USED,
      });
    }

    return data;
  }

  async findAll(): Promise<OrderDTO[]> {
    const ordersResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const orders = ordersResult.map((u) => u.toJSON() as OrderDTO);

    return orders;
  }

  async findByFilter(filterOrderDTO: FilterOrderDTO): Promise<OrderDTO[]> {
    const ordersResult = await this.serviceModel
      .find({ ...filterOrderDTO, deleted: null })
      .exec();

    const orders = ordersResult.map((u) => u.toJSON() as OrderDTO);

    return orders;
  }

  async findOne(id: string): Promise<OrderDTO> {
    const orderResult = await this.serviceModel.findOne({ _id: id }).exec();

    const order: OrderDTO = orderResult.toJSON() as OrderDTO;

    return order;
  }

  async update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<OrderDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateOrderDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const order = await this.findOne(id);

    if (
      updateOrderDTO.status &&
      updateOrderDTO.status === OrderStatusEnum.DONE
    ) {
      await this.queueService.update(order.queueId, {
        status: QueueStatusEnum.AVAILABLE,
      });
    }

    const updatedOrder = await this.findOne(id);

    return updatedOrder;
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
