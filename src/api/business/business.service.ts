import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum } from '@src/enums';
import { BusinessSchema, IBusinessDoc } from '@src/schema/business.schema';
import { generateContinuousID } from '@src/util/id-generator';
import { generateSlug } from '@src/util/slug-generator';

import {
  BusinessDTO,
  CreateBusinessDTO,
  FilterBusinessDTO,
  UpdateBusinessDTO,
} from './business.dto';

@Injectable()
export class BusinessService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Business ||
      model<IBusinessDoc>('Business', BusinessSchema);
  }
  async create(createBusinessDTO: CreateBusinessDTO): Promise<BusinessDTO> {
    const BID = await generateContinuousID(
      IDTypeEnum.BUSINESS,
      await this.getLastID(),
    );
    const business = await this.serviceModel.create({
      ...createBusinessDTO,
      BID,
      slug: 'slug',
    });

    const businessData: BusinessDTO = business.toJSON() as BusinessDTO;

    const updatedSlugData = await this.updateSlug(businessData.id);

    return updatedSlugData;
  }

  async findAll(): Promise<BusinessDTO[]> {
    const businessesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const businesses = businessesResult.map((u) => u.toJSON() as BusinessDTO);

    return businesses;
  }

  async findByFilter(
    filterBusinessDTO: FilterBusinessDTO,
  ): Promise<BusinessDTO[]> {
    const businessesResult = await this.serviceModel
      .find({ ...filterBusinessDTO, deleted: null })
      .exec();

    const businesses = businessesResult.map((u) => u.toJSON() as BusinessDTO);

    return businesses;
  }

  async findOne(id: string): Promise<BusinessDTO> {
    const businessResult = await this.serviceModel.findOne({ _id: id }).exec();

    const business: BusinessDTO = businessResult.toJSON() as BusinessDTO;

    return business;
  }

  async findSlug(slug: string): Promise<BusinessDTO> {
    const businessResult = await this.serviceModel.findOne({ slug }).exec();

    const business: BusinessDTO = businessResult.toJSON() as BusinessDTO;

    return business;
  }

  async update(
    id: string,
    updateBusinessDTO: UpdateBusinessDTO,
  ): Promise<BusinessDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateBusinessDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedSlugData = await this.updateSlug(id);

    return updatedSlugData;
  }

  updateSlug = async (id: string): Promise<BusinessDTO> => {
    const business: BusinessDTO = await this.findOne(id);

    let slug = '';
    let length = 5;

    while (!slug) {
      const generatedSlug = generateSlug(business.name, length, id);
      const businessResult = await this.serviceModel
        .findOne({ slug: generatedSlug })
        .exec();

      if (!businessResult) {
        slug = generatedSlug;
      } else {
        length++;
      }
    }

    await this.serviceModel.updateOne({ _id: id }, { slug }).exec();

    return {
      ...business,
      slug,
    };
  };

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
    const rent: BusinessDTO = await this.serviceModel
      .findOne({ BID: { $ne: null } })
      .sort({
        BID: -1,
      })
      .lean()
      .exec();

    return rent?.BID ?? null;
  };
}
