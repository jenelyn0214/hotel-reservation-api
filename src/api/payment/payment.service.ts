import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IPaymentDoc, PaymentSchema } from '@src/schema/payment.schema';

import {
  CreatePaymentDTO,
  FilterPaymentDTO,
  PaymentDTO,
  UpdatePaymentDTO,
} from './payment.dto';

@Injectable()
export class PaymentService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Payment ||
      model<IPaymentDoc>('Payment', PaymentSchema);
  }
  async create(createPaymentDTO: CreatePaymentDTO): Promise<PaymentDTO> {
    const payment = await this.serviceModel.create(createPaymentDTO);

    return payment.toJSON() as PaymentDTO;
  }

  async findAll(): Promise<PaymentDTO[]> {
    const paymentsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const payments = paymentsResult.map((u) => u.toJSON() as PaymentDTO);

    return payments;
  }

  async findByFilter(
    filterPaymentDTO: FilterPaymentDTO,
  ): Promise<PaymentDTO[]> {
    const { createdFrom, createdTo, ...filters } = filterPaymentDTO;

    let filterData = {
      ...filters,
      deleted: null,
    } as unknown as any;

    if (createdFrom && createdTo) {
      createdTo.setHours(23, 59, 59, 999);
      filterData = {
        ...filterData,
        created: { $gte: createdFrom, $lte: createdTo },
      };
    }

    const paymentsResult = await this.serviceModel.find(filterData).exec();

    const payments = paymentsResult.map((u) => u.toJSON() as PaymentDTO);

    return payments;
  }

  async findOne(id: string): Promise<PaymentDTO> {
    const paymentResult = await this.serviceModel.findOne({ _id: id }).exec();

    const payment: PaymentDTO = paymentResult.toJSON() as PaymentDTO;

    return payment;
  }

  async update(
    id: string,
    updatePaymentDTO: UpdatePaymentDTO,
  ): Promise<PaymentDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updatePaymentDTO,
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

  async getPaymentsByPropertyOwner(userId: string): Promise<PaymentDTO[]> {
    const payments = await this.findAll();

    const filteredResult = payments.filter(
      (payment) => payment.room?.property?.userId === userId,
    );

    return filteredResult;
  }
}
