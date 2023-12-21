import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { ContactUsSchema, IContactUsDoc } from '@src/schema/contact-us.schema';

import {
  ContactUsDTO,
  CreateContactUsDTO,
  FilterContactUsDTO,
  UpdateContactUsDTO,
} from './contact-us.dto';

@Injectable()
export class ContactUsService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.ContactUs ||
      model<IContactUsDoc>('ContactUs', ContactUsSchema);
  }
  async create(createContactUsDTO: CreateContactUsDTO): Promise<ContactUsDTO> {
    const contactUs = await this.serviceModel.create(createContactUsDTO);

    return contactUs.toJSON() as ContactUsDTO;
  }

  async findAll(): Promise<ContactUsDTO[]> {
    const contactUssResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const contactUss = contactUssResult.map((u) => u.toJSON() as ContactUsDTO);

    return contactUss;
  }

  async findByFilter(
    filterContactUsDTO: FilterContactUsDTO,
  ): Promise<ContactUsDTO[]> {
    const contactUssResult = await this.serviceModel
      .find({ ...filterContactUsDTO, deleted: null })
      .exec();

    const contactUss = contactUssResult.map((u) => u.toJSON() as ContactUsDTO);

    return contactUss;
  }

  async findOne(id: string): Promise<ContactUsDTO> {
    const contactUs = await this.serviceModel.findOne({ _id: id }).exec();

    return contactUs.toJSON() as ContactUsDTO;
  }

  async update(
    id: string,
    updateContactUsDTO: UpdateContactUsDTO,
  ): Promise<ContactUsDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateContactUsDTO,
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
