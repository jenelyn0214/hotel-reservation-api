import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum } from '@src/enums';
import { IInvoiceDoc, InvoiceSchema } from '@src/schema/invoice.schema';
import { generateContinuousID } from '@src/util/id-generator';

import {
  CreateInvoiceDTO,
  FilterInvoiceDTO,
  InvoiceDTO,
  UpdateInvoiceDTO,
} from './invoice.dto';

@Injectable()
export class InvoiceService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Invoice ||
      model<IInvoiceDoc>('Invoice', InvoiceSchema);
  }
  async create(createInvoiceDTO: CreateInvoiceDTO): Promise<InvoiceDTO> {
    const IVID = await generateContinuousID(
      IDTypeEnum.INVOICE,
      await this.getLastID(),
    );
    const invoice = await this.serviceModel.create({
      ...createInvoiceDTO,
      IVID,
    });

    return invoice.toJSON() as InvoiceDTO;
  }

  async findAll(): Promise<InvoiceDTO[]> {
    const invoicesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const invoices = invoicesResult.map((u) => u.toJSON() as InvoiceDTO);

    return invoices;
  }

  async findByFilter(
    filterInvoiceDTO: FilterInvoiceDTO,
  ): Promise<InvoiceDTO[]> {
    const invoicesResult = await this.serviceModel
      .find({ ...filterInvoiceDTO, deleted: null })
      .exec();

    const invoices = invoicesResult.map((u) => u.toJSON() as InvoiceDTO);

    return invoices;
  }

  async findOne(id: string): Promise<InvoiceDTO> {
    const invoiceResult = await this.serviceModel.findOne({ _id: id }).exec();

    const invoice: InvoiceDTO = invoiceResult.toJSON() as InvoiceDTO;

    return invoice;
  }

  async update(
    id: string,
    updateInvoiceDTO: UpdateInvoiceDTO,
  ): Promise<InvoiceDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateInvoiceDTO,
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

  getLastID = async (): Promise<string | null> => {
    const invoice: InvoiceDTO = await this.serviceModel
      .findOne({ IVID: { $ne: null } })
      .sort({
        IVID: -1,
      })
      .lean()
      .exec();

    return invoice?.IVID ?? null;
  };

  async getInvoicesByPropertyOwner(userId: string): Promise<InvoiceDTO[]> {
    const invoices = await this.findAll();

    const filteredResult = invoices.filter(
      (invoice) => invoice.room?.property?.userId === userId,
    );

    return filteredResult;
  }
}
