import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  EmergencyContactSchema,
  IEmergencyContactDoc,
} from '@src/schema/emergency-contact.schema';

import {
  CreateEmergencyContactDTO,
  EmergencyContactDTO,
  FilterEmergencyContactDTO,
  UpdateEmergencyContactDTO,
} from './emergency-contact.dto';

@Injectable()
export class EmergencyContactService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.EmergencyContact ||
      model<IEmergencyContactDoc>('EmergencyContact', EmergencyContactSchema);
  }
  async create(
    createEmergencyContactDTO: CreateEmergencyContactDTO,
  ): Promise<EmergencyContactDTO> {
    const emergencyContact = await this.serviceModel.create(
      createEmergencyContactDTO,
    );

    return emergencyContact.toJSON() as EmergencyContactDTO;
  }

  async findAll(): Promise<EmergencyContactDTO[]> {
    const emergencyContactsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const emergencyContacts = emergencyContactsResult.map(
      (u) => u.toJSON() as EmergencyContactDTO,
    );

    return emergencyContacts;
  }

  async findByFilter(
    filterEmergencyContactDTO: FilterEmergencyContactDTO,
  ): Promise<EmergencyContactDTO[]> {
    const emergencyContactsResult = await this.serviceModel
      .find({ ...filterEmergencyContactDTO, deleted: null })
      .exec();

    const emergencyContacts = emergencyContactsResult.map(
      (u) => u.toJSON() as EmergencyContactDTO,
    );

    return emergencyContacts;
  }

  async findOne(id: string): Promise<EmergencyContactDTO> {
    const emergencyContact = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    return emergencyContact.toJSON() as EmergencyContactDTO;
  }

  async update(
    id: string,
    updateEmergencyContactDTO: UpdateEmergencyContactDTO,
  ): Promise<EmergencyContactDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateEmergencyContactDTO,
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
