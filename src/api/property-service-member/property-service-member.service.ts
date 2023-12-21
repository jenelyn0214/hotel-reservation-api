import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  IPropertyServiceMemberDoc,
  PropertyServiceMemberSchema,
} from '@src/schema/property-service-member.schema';

import {
  CreatePropertyServiceMemberDTO,
  FilterPropertyServiceMemberDTO,
  PropertyServiceMemberDTO,
  UpdatePropertyServiceMemberDTO,
} from './property-service-member.dto';

@Injectable()
export class PropertyServiceMemberService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.PropertyServiceMember ||
      model<IPropertyServiceMemberDoc>(
        'PropertyServiceMember',
        PropertyServiceMemberSchema,
      );
  }
  async create(
    createPropertyServiceMemberDTO: CreatePropertyServiceMemberDTO,
  ): Promise<PropertyServiceMemberDTO> {
    const propertyServiceMember = await this.serviceModel.create(
      createPropertyServiceMemberDTO,
    );

    return propertyServiceMember.toJSON() as PropertyServiceMemberDTO;
  }

  async findAll(): Promise<PropertyServiceMemberDTO[]> {
    const propertyServiceMembersResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const propertyServiceMembers = propertyServiceMembersResult.map(
      (u) => u.toJSON() as PropertyServiceMemberDTO,
    );

    return propertyServiceMembers;
  }

  async findByFilter(
    filterPropertyServiceMemberDTO: FilterPropertyServiceMemberDTO,
  ): Promise<PropertyServiceMemberDTO[]> {
    const propertyServiceMembersResult = await this.serviceModel
      .find({ ...filterPropertyServiceMemberDTO, deleted: null })
      .exec();

    const propertyServiceMembers = propertyServiceMembersResult.map(
      (u) => u.toJSON() as PropertyServiceMemberDTO,
    );

    return propertyServiceMembers;
  }

  async findOne(id: string): Promise<PropertyServiceMemberDTO> {
    const propertyServiceMember = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    return propertyServiceMember.toJSON() as PropertyServiceMemberDTO;
  }

  async update(
    id: string,
    updatePropertyServiceMemberDTO: UpdatePropertyServiceMemberDTO,
  ): Promise<PropertyServiceMemberDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updatePropertyServiceMemberDTO,
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

  async getPropertyServiceMemberByPropertyOwner(
    userId: string,
  ): Promise<PropertyServiceMemberDTO[]> {
    const propertyServiceMember = await this.findAll();

    const filteredResult = propertyServiceMember.filter(
      (request) => request?.property?.userId === userId,
    );

    return filteredResult;
  }
}
