import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import {
  PropertyManagementBPItemDTO,
  PropertyManagementDTO,
  PropertyManagementItemDTO,
} from '@src/api/property-management/property-management.dto';
import { PropertyManagementService } from '@src/api/property-management/property-management.service';
import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum, RentStatusEnum } from '@src/enums';
import { IRentDoc, RentSchema } from '@src/schema/rent.schema';
import { generateContinuousID } from '@src/util/id-generator';

import {
  CreateRentDTO,
  FilterRentDTO,
  RentDTO,
  UpdateRentDTO,
} from './rent.dto';

@Injectable()
export class RentService {
  private serviceModel: typeof Model;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly propertyManagementService: PropertyManagementService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.Rent || model<IRentDoc>('Rent', RentSchema);
  }
  async create(createRentDTO: CreateRentDTO): Promise<RentDTO> {
    const filterRent = {
      userId: createRentDTO.userId,
      status: {
        $nin: [
          RentStatusEnum.CANCELLED,
          RentStatusEnum.MOVED_OUT,
          RentStatusEnum.REFUNDED,
        ],
      },
      deleted: null,
    };

    const rentsResult = await this.serviceModel.find(filterRent).exec();

    if (rentsResult.length)
      throw new ForbiddenException('User has ongoing rent transaction');

    const REID = await generateContinuousID(
      IDTypeEnum.RENT,
      await this.getLastID(),
    );

    const rent = await this.serviceModel.create({
      ...createRentDTO,
      REID,
    });

    const rentData: RentDTO = rent.toJSON() as RentDTO;

    const updatedData = await this.updatePropertyManagement(rentData.id);

    return updatedData;
  }

  async findAll(): Promise<RentDTO[]> {
    const rentsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const rents = rentsResult.map((u) => u.toJSON() as RentDTO);

    return rents;
  }

  async findByFilter(filterRentDTO: FilterRentDTO): Promise<RentDTO[]> {
    const rentsResult = await this.serviceModel
      .find({ ...filterRentDTO, deleted: null })
      .exec();

    const rents = rentsResult.map((u) => u.toJSON() as RentDTO);

    return rents;
  }

  async findOne(id: string): Promise<RentDTO> {
    const rentResult = await this.serviceModel.findOne({ _id: id }).exec();

    const rent: RentDTO = rentResult.toJSON() as RentDTO;

    return rent;
  }

  async update(id: string, updateRentDTO: UpdateRentDTO): Promise<RentDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRentDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedData = await this.updatePropertyManagement(id);

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
    const rent: RentDTO = await this.serviceModel
      .findOne({ REID: { $ne: null } })
      .sort({
        REID: -1,
      })
      .lean()
      .exec();

    return rent?.REID ?? null;
  };

  async getRentsByPropertyOwner(userId: string): Promise<RentDTO[]> {
    const rents = await this.findAll();

    const filteredResult = rents.filter(
      (rent) => rent?.room?.property?.userId === userId,
    );

    return filteredResult;
  }

  getPropertyManagement = async (data: RentDTO) => {
    let result: RentDTO = {
      ...data,
    };

    const propertyManagement: PropertyManagementDTO =
      await this.propertyManagementService.findAll();

    if (propertyManagement) {
      const minimumStay: PropertyManagementItemDTO =
        propertyManagement?.durationStay?.find(
          (item) => item.id === data.minimumStayId,
        );

      const advance: PropertyManagementBPItemDTO =
        propertyManagement?.advances.find((item) => item.id === data.advanceId);

      const rentalAdvance: PropertyManagementBPItemDTO =
        propertyManagement?.rentalAdvances?.find(
          (item) => item.id === data.rentalAdvanceId,
        );

      result = {
        ...result,
        minimumStay,
        advance,
        rentalAdvance,
      };
    }

    return result;
  };

  updatePropertyManagement = async (id: string): Promise<RentDTO> => {
    const rent: RentDTO = await this.findOne(id);

    const { minimumStay, advance, rentalAdvance } =
      await this.getPropertyManagement(rent);

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          minimumStay,
          advance,
          rentalAdvance,
        },
      )
      .exec();

    return {
      ...rent,
      minimumStay,
      advance,
      rentalAdvance,
    };
  };
}
