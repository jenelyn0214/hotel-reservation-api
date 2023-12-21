import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import {
  PropertyManagementBPItemDTO,
  PropertyManagementDTO,
  PropertyManagementItemDTO,
  PropertyManagementOfferItemDTO,
} from '@src/api/property-management/property-management.dto';
import { PropertyManagementService } from '@src/api/property-management/property-management.service';
import { defaultPropertyOptions } from '@src/constants';
import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum } from '@src/enums';
import { IProperty } from '@src/interfaces';
import { IPropertyDoc, PropertySchema } from '@src/schema/property.schema';
import { generateContinuousID } from '@src/util/id-generator';
import { generateSlug } from '@src/util/slug-generator';

import {
  CreatePropertyDTO,
  FilterPropertyDTO,
  PropertyDTO,
  UpdatePropertyDTO,
} from './property.dto';

@Injectable()
export class PropertyService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly propertyManagementService: PropertyManagementService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.Property ||
      model<IPropertyDoc>('Property', PropertySchema);
  }
  async create(createPropertyDTO: CreatePropertyDTO): Promise<PropertyDTO> {
    const LPID = await generateContinuousID(
      IDTypeEnum.PROPERTY,
      await this.getLastID(),
    );

    const formData: IProperty = {
      ...createPropertyDTO,
      LPID,
      slug: 'slug',
      options: defaultPropertyOptions,
    };

    const property = await this.serviceModel.create(formData);

    const propertyData: PropertyDTO = property.toJSON() as PropertyDTO;

    const updatedData = await this.updateSlugAndPropertyManagement(
      propertyData.id,
    );

    return updatedData;
  }

  async findAll(): Promise<PropertyDTO[]> {
    const propertiesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const properties = propertiesResult.map((u) => u.toJSON() as PropertyDTO);

    return properties;
  }

  async findByFilter(
    filterPropertyDTO: FilterPropertyDTO,
  ): Promise<PropertyDTO[]> {
    const propertiesResult = await this.serviceModel
      .find({ ...filterPropertyDTO, deleted: null })
      .exec();

    const properties = propertiesResult.map((u) => u.toJSON() as PropertyDTO);

    return properties;
  }

  async findOne(id: string): Promise<PropertyDTO> {
    const propertyResult = await this.serviceModel.findOne({ _id: id }).exec();

    const property: PropertyDTO = propertyResult.toJSON() as PropertyDTO;

    return property;
  }

  async findSlug(slug: string): Promise<PropertyDTO> {
    const propertyResult = await this.serviceModel.findOne({ slug }).exec();

    const property: PropertyDTO = propertyResult.toJSON() as PropertyDTO;

    return property;
  }

  async update(
    id: string,
    updatePropertyDTO: UpdatePropertyDTO,
  ): Promise<PropertyDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updatePropertyDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedData = await this.updateSlugAndPropertyManagement(id);

    return updatedData;
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
    const property: PropertyDTO = await this.serviceModel
      .findOne({ LPID: { $ne: null } })
      .sort({
        LPID: -1,
      })
      .lean()
      .exec();

    return property?.LPID ?? null;
  };

  getPropertyManagement = async (data: PropertyDTO) => {
    const management: PropertyManagementDTO =
      await this.propertyManagementService.findAll();

    if (management) {
      const propertyType: PropertyManagementItemDTO =
        management?.propertyType?.find(
          (item) => item.id === data.propertyTypeId,
        );

      const minimumStay: PropertyManagementItemDTO =
        management?.durationStay?.find(
          (item) => item.id === data.minimumStayId,
        );

      const percentageIncrease: PropertyManagementItemDTO =
        management?.percentageIncrease?.find(
          (item) => item.id === data.percentageIncreaseId,
        );

      const increaseType: PropertyManagementItemDTO =
        management?.increaseType?.find(
          (item) => item.id === data.increaseTypeId,
        );

      const advance: PropertyManagementBPItemDTO = management?.advances?.find(
        (item) => item.id === data.advanceId,
      );

      const rentalAdvance: PropertyManagementBPItemDTO =
        management?.rentalAdvances?.find(
          (item) => item.id === data.rentalAdvanceId,
        );

      const billingType: PropertyManagementItemDTO =
        management?.billingTypes?.find(
          (item) => item.id === data.billingTypeId,
        );

      const offers: PropertyManagementOfferItemDTO[] =
        management?.offerTypes?.filter((item) =>
          data.offerIds.includes(item.id),
        );

      return {
        ...data,
        propertyType,
        minimumStay,
        percentageIncrease,
        increaseType,
        advance,
        rentalAdvance,
        billingType,
        offers,
      };
    }

    return {
      ...data,
    };
  };

  updateSlugAndPropertyManagement = async (
    id: string,
  ): Promise<PropertyDTO> => {
    const property: PropertyDTO = await this.findOne(id);

    const {
      propertyType,
      minimumStay,
      percentageIncrease,
      increaseType,
      advance,
      rentalAdvance,
      billingType,
      offers,
    } = await this.getPropertyManagement(property);

    let slug = '';
    let length = 5;

    while (!slug) {
      const generatedSlug = generateSlug(property.name, length, id);
      const propertyResult = await this.serviceModel
        .findOne({ slug: generatedSlug })
        .exec();

      if (!propertyResult) {
        slug = generatedSlug;
      } else {
        length++;
      }
    }

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          slug,
          propertyType,
          minimumStay,
          percentageIncrease,
          increaseType,
          advance,
          rentalAdvance,
          billingType,
          offers,
        },
      )
      .exec();

    return {
      ...property,
      slug,
      propertyType,
      minimumStay,
      percentageIncrease,
      increaseType,
      advance,
      rentalAdvance,
      billingType,
      offers,
    };
  };

  async getPropertyByPropertyOwner(userId: string): Promise<PropertyDTO[]> {
    const property = await this.findAll();

    const filteredResult = property.filter(
      (request) => request?.user?.id === userId,
    );

    return filteredResult;
  }
}
