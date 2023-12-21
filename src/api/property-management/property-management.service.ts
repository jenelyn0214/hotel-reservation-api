import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  PropertyManagementBPItemEnum,
  PropertyManagementItemEnum,
} from '@src/enums';
import {
  IPropertyManagementDoc,
  PropertyManagementSchema,
} from '@src/schema/property-management.schema';

import {
  CreatePropertyManagementBPItemDTO,
  CreatePropertyManagementDTO,
  CreatePropertyManagementItemDTO,
  CreatePropertyManagementOfferItemDTO,
  PropertyManagementBPItemDTO,
  PropertyManagementDTO,
  PropertyManagementItemDTO,
  PropertyManagementOfferItemDTO,
  UpdatePropertyManagementBPItemDTO,
  UpdatePropertyManagementDTO,
  UpdatePropertyManagementItemDTO,
  UpdatePropertyManagementOfferItemDTO,
} from './property-management.dto';

@Injectable()
export class PropertyManagementService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.PropertyManagement ||
      model<IPropertyManagementDoc>(
        'PropertyManagement',
        PropertyManagementSchema,
      );
  }
  async create(
    createPropertyManagementDTO: CreatePropertyManagementDTO,
  ): Promise<PropertyManagementDTO> {
    const management = await this.findAll();

    if (!management) {
      const propertyManagement = await this.serviceModel.create(
        createPropertyManagementDTO,
      );

      return propertyManagement.toJSON() as PropertyManagementDTO;
    } else {
      throw new ForbiddenException('Property Management already exists');
    }
  }

  async findAll(): Promise<PropertyManagementDTO> {
    const propertyManagementResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const propertyManagements = propertyManagementResult.map(
      (u) => u.toJSON() as PropertyManagementDTO,
    );

    const propertyManagementData = propertyManagements.map((item) => {
      const propertyType = item.propertyType
        .filter((propertyType) => !propertyType.deleted)
        .sort((a, b) => a.name.localeCompare(b.name));

      const durationStay = item.durationStay
        .filter((durationStay) => !durationStay.deleted)
        .sort((a, b) => {
          // Extract the value and unit from the name property
          const regex = /^(\d+)\s+(\w+)/;
          const matchA = regex.exec(a.name);
          const matchB = regex.exec(b.name);

          const valueA = parseInt(matchA[1]);
          const valueB = parseInt(matchB[1]);

          const unitA = matchA[2].toLowerCase();
          const unitB = matchB[2].toLowerCase();

          // If both items have the same unit, sort by value
          if (unitA === unitB) {
            return valueA - valueB;
          }

          // If the first item has a month unit, it should come first
          if (unitA === 'month') {
            return -1;
          }

          // If the second item has a month unit, it should come first
          if (unitB === 'month') {
            return 1;
          }

          // If neither item has a month unit, sort by unit name
          return unitA.localeCompare(unitB);
        });

      const percentageIncrease = item.percentageIncrease
        .filter((percentageIncrease) => !percentageIncrease.deleted)
        .sort((a, b) => {
          const nameA = parseInt(a.name);
          const nameB = parseInt(b.name);

          return nameA - nameB;
        });

      const increaseType = item.increaseType
        .filter((increaseType) => !increaseType.deleted)
        .sort((a, b) => {
          // Extract the value and unit from the name property
          const regex = /^(\d+)\s+(\w+)/;
          const matchA = regex.exec(a.name);
          const matchB = regex.exec(b.name);

          const valueA = parseInt(matchA[1]);
          const valueB = parseInt(matchB[1]);

          const unitA = matchA[2].toLowerCase();
          const unitB = matchB[2].toLowerCase();

          // If both items have the same unit, sort by value
          if (unitA === unitB) {
            return valueA - valueB;
          }

          // If the first item has a month unit, it should come first
          if (unitA === 'month') {
            return -1;
          }

          // If the second item has a month unit, it should come first
          if (unitB === 'month') {
            return 1;
          }

          // If neither item has a month unit, sort by unit name
          return unitA.localeCompare(unitB);
        });

      const billingTypes = item.billingTypes
        .filter((billingTypes) => !billingTypes.deleted)
        .sort((a, b) => a.name.localeCompare(b.name));

      const advances = item.advances
        .filter((advances) => !advances.deleted)
        .sort((a, b) => a.name.localeCompare(b.name));

      const rentalAdvances = item.rentalAdvances
        .filter((rentalAdvances) => !rentalAdvances.deleted)
        .sort((a, b) => a.name.localeCompare(b.name));

      const offerTypes = item.offerTypes.filter(
        (offerTypes) => !offerTypes.deleted,
      );

      return {
        ...item,
        propertyType,
        durationStay,
        percentageIncrease,
        increaseType,
        billingTypes,
        advances,
        rentalAdvances,
        offerTypes,
      };
    });

    return propertyManagementData.length > 0 ? propertyManagementData[0] : null;
  }

  async update(
    updatePropertyManagementDTO: UpdatePropertyManagementDTO,
  ): Promise<PropertyManagementDTO> {
    const management = await this.findAll();

    if (management) {
      await this.serviceModel
        .updateOne(
          { _id: management.id },
          {
            ...updatePropertyManagementDTO,
            updated: Date.now(),
          },
        )
        .exec();

      return this.findAll();
    }
  }

  async remove(): Promise<boolean> {
    const management = await this.findAll();

    if (management) {
      const result = await this.serviceModel
        .updateOne({ _id: management.id }, { deleted: Date.now() })
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

  async createPropertyManagementItem(
    type: PropertyManagementItemEnum,
    createPropertyManagementItemDTO: CreatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      await this.serviceModel
        .updateOne(
          { _id: management.id },
          {
            $addToSet: {
              [type]: createPropertyManagementItemDTO,
            },
          },
        )
        .exec();

      const managementData = await this.findAll();

      return managementData[type];
    }
  }

  async updatePropertyManagementItem(
    type: PropertyManagementItemEnum,
    itemId: string,
    updatePropertyManagementItemDTO: UpdatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      if (type === PropertyManagementItemEnum.PROPERTY_TYPE) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'propertyType.$[item].name':
                  updatePropertyManagementItemDTO.name,
                'propertyType.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.BILLING_TYPES) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'billingTypes.$[item].name':
                  updatePropertyManagementItemDTO.name,
                'billingTypes.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.DURATION_STAY) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'durationStay.$[item].name':
                  updatePropertyManagementItemDTO.name,
                'durationStay.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.INCREASE_TYPE) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'increaseType.$[item].name':
                  updatePropertyManagementItemDTO.name,
                'increaseType.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.PERCENTAGE_INCREASE) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'percentageIncrease.$[item].name':
                  updatePropertyManagementItemDTO.name,
                'percentageIncrease.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      }

      const managementData = await this.findAll();

      return managementData[type];
    }
  }

  async deletePropertyManagementItem(
    type: PropertyManagementItemEnum,
    itemId: string,
  ): Promise<PropertyManagementItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      if (type === PropertyManagementItemEnum.PROPERTY_TYPE) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'propertyType.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.BILLING_TYPES) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'billingTypes.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.DURATION_STAY) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'durationStay.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.INCREASE_TYPE) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'increaseType.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementItemEnum.PERCENTAGE_INCREASE) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'percentageIncrease.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      }

      const managementData = await this.findAll();

      return managementData[type];
    }
  }

  async createPropertyManagementBPItem(
    type: PropertyManagementBPItemEnum,
    createPropertyManagementBPItemDTO: CreatePropertyManagementBPItemDTO,
  ): Promise<PropertyManagementBPItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      await this.serviceModel
        .updateOne(
          { _id: management.id },
          {
            $addToSet: {
              [type]: createPropertyManagementBPItemDTO,
            },
          },
        )
        .exec();

      const managementData = await this.findAll();

      return managementData[type];
    }
  }

  async updatePropertyManagementBPItem(
    type: PropertyManagementBPItemEnum,
    itemId: string,
    updatePropertyManagementBPItemDTO: UpdatePropertyManagementBPItemDTO,
  ): Promise<PropertyManagementBPItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      if (type === PropertyManagementBPItemEnum.ADVANCES) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'advances.$[item].name': updatePropertyManagementBPItemDTO.name,
                'advances.$[item].billingTypeId':
                  updatePropertyManagementBPItemDTO.billingTypeId,
                'advances.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementBPItemEnum.RENTAL_ADVANCES) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'rentalAdvances.$[item].name':
                  updatePropertyManagementBPItemDTO.name,
                'rentalAdvances.$[item].billingTypeId':
                  updatePropertyManagementBPItemDTO.billingTypeId,
                'rentalAdvances.$[item].updated': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      }

      const managementData = await this.findAll();

      return managementData[type];
    }
  }

  async deletePropertyManagementBPItem(
    type: PropertyManagementBPItemEnum,
    itemId: string,
  ): Promise<PropertyManagementBPItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      if (type === PropertyManagementBPItemEnum.ADVANCES) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'advances.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      } else if (type === PropertyManagementBPItemEnum.RENTAL_ADVANCES) {
        await this.serviceModel
          .updateOne(
            { _id: management.id },
            {
              $set: {
                'rentalAdvances.$[item].deleted': Date.now(),
              },
            },
            {
              arrayFilters: [{ 'item._id': itemId }],
            },
          )
          .exec();
      }
      const managementData = await this.findAll();

      return managementData[type];
    }
  }

  async createPropertyManagementOfferItem(
    createPropertyManagementOfferItemDTO: CreatePropertyManagementOfferItemDTO,
  ): Promise<PropertyManagementOfferItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      await this.serviceModel
        .updateOne(
          { _id: management.id },
          {
            $addToSet: {
              offerTypes: createPropertyManagementOfferItemDTO,
            },
          },
        )
        .exec();

      const managementData = await this.findAll();

      return managementData.offerTypes;
    }
  }

  async updatePropertyManagementOfferItem(
    itemId: string,
    updatePropertyManagementOfferItemDTO: UpdatePropertyManagementOfferItemDTO,
  ): Promise<PropertyManagementOfferItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      await this.serviceModel
        .updateOne(
          { _id: management.id },
          {
            $set: {
              'offerTypes.$[item].image':
                updatePropertyManagementOfferItemDTO.image,
              'offerTypes.$[item].title':
                updatePropertyManagementOfferItemDTO.title,
              'offerTypes.$[item].updated': Date.now(),
            },
          },
          {
            arrayFilters: [{ 'item._id': itemId }],
          },
        )
        .exec();

      const managementData = await this.findAll();

      return managementData.offerTypes;
    }
  }

  async deletePropertyManagementOfferItem(
    itemId: string,
  ): Promise<PropertyManagementOfferItemDTO[]> {
    const management = await this.findAll();

    if (management) {
      await this.serviceModel
        .updateOne(
          { _id: management.id },
          {
            $set: {
              'offerTypes.$[item].deleted': Date.now(),
            },
          },
          {
            arrayFilters: [{ 'item._id': itemId }],
          },
        )
        .exec();

      const managementData = await this.findAll();

      return managementData.offerTypes;
    }
  }
}
