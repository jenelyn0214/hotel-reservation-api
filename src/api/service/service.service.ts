import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum } from '@src/enums';
import { IServiceDoc, ServiceSchema } from '@src/schema/service.schema';
import { generateContinuousID } from '@src/util/id-generator';
import { generateSlug } from '@src/util/slug-generator';

import {
  CreateServiceDTO,
  CreateServiceItemDTO,
  CreateServiceReviewDTO,
  FilterServiceDTO,
  ServiceDTO,
  ServiceItemDTO,
  ServiceReviewDTO,
  UpdateServiceDTO,
  UpdateServiceItemDTO,
  UpdateServiceReviewDTO,
} from './service.dto';

@Injectable()
export class ServiceService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IServiceDoc>('Service', ServiceSchema);
  }
  async create(createServiceDTO: CreateServiceDTO): Promise<ServiceDTO> {
    const SID = await generateContinuousID(
      IDTypeEnum.SERVICE,
      await this.getLastID(),
    );
    const service = await this.serviceModel.create({
      ...createServiceDTO,
      SID,
      slug: 'slug',
    });

    const serviceData: ServiceDTO = service.toJSON() as ServiceDTO;

    const updatedSlugData = await this.updateSlug(serviceData.id);

    return updatedSlugData;
  }

  async findAll(): Promise<ServiceDTO[]> {
    const servicesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const services = servicesResult.map((u) => u.toJSON() as ServiceDTO);

    const serviceData = services.map((item) => {
      const items = item.items.filter((item) => !item.deleted);

      return {
        ...item,
        items,
      };
    });

    return serviceData;
  }

  async findByFilter(
    filterServiceDTO: FilterServiceDTO,
  ): Promise<ServiceDTO[]> {
    const servicesResult = await this.serviceModel
      .find({ ...filterServiceDTO, deleted: null })
      .exec();

    const services = servicesResult.map((u) => u.toJSON() as ServiceDTO);

    const serviceData = services.map((item) => {
      const items = item.items.filter((item) => !item.deleted);

      return {
        ...item,
        items,
      };
    });

    return serviceData;
  }

  async findOne(id: string): Promise<ServiceDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    const items = service.items.filter((item) => !item.deleted);

    const serviceData = {
      ...service.toJSON(),
      items,
    };

    return serviceData;
  }

  async findSlug(slug: string): Promise<ServiceDTO> {
    const service = await this.serviceModel.findOne({ slug }).exec();

    const items = service.items.filter((item) => !item.deleted);

    const serviceData = {
      ...service.toJSON(),
      items,
    };

    return serviceData;
  }

  async update(
    id: string,
    updateServiceDTO: UpdateServiceDTO,
  ): Promise<ServiceDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateServiceDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedSlugData = await this.updateSlug(id);

    return updatedSlugData;
  }

  updateSlug = async (id: string): Promise<ServiceDTO> => {
    const service: ServiceDTO = await this.findOne(id);

    let slug = '';
    let length = 5;

    while (!slug) {
      const generatedSlug = generateSlug(service.name, length, id);
      const serviceResult = await this.serviceModel
        .findOne({ slug: generatedSlug })
        .exec();

      if (!serviceResult) {
        slug = generatedSlug;
      } else {
        length++;
      }
    }

    await this.serviceModel.updateOne({ _id: id }, { slug }).exec();

    return {
      ...service,
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
    const service: ServiceDTO = await this.serviceModel
      .findOne({ SID: { $ne: null } })
      .sort({
        SID: -1,
      })
      .lean()
      .exec();

    return service?.SID ?? null;
  };

  async createServiceItem(
    id: string,
    createServiceItemDTO: CreateServiceItemDTO,
  ): Promise<ServiceItemDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $addToSet: {
            items: createServiceItemDTO,
          },
        },
      )
      .exec();

    const serviceData = await this.findOne(id);

    return serviceData.items;
  }

  async updateServiceItem(
    id: string,
    itemId: string,
    updateServiceItemDTO: UpdateServiceItemDTO,
  ): Promise<ServiceItemDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'items.$[item].item': updateServiceItemDTO.item,
            'items.$[item].photo': updateServiceItemDTO.photo,
            'items.$[item].rate': updateServiceItemDTO.rate,
            'items.$[item].variants': updateServiceItemDTO.variants,
            'items.$[item].updated': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const serviceData = await this.findOne(id);

    return serviceData.items;
  }

  async deleteServiceItem(
    id: string,
    itemId: string,
  ): Promise<ServiceItemDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'items.$[item].deleted': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const serviceData = await this.findOne(id);

    return serviceData.items;
  }

  async createServiceReview(
    id: string,
    createServiceReviewDTO: CreateServiceReviewDTO,
  ): Promise<ServiceReviewDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $addToSet: {
            reviews: createServiceReviewDTO,
          },
        },
      )
      .exec();

    const reviewsData = await this.getServiceReview(id);

    return reviewsData;
  }

  async updateServiceReview(
    id: string,
    itemId: string,
    updateServiceReviewDTO: UpdateServiceReviewDTO,
  ): Promise<ServiceReviewDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'reviews.$[item].message': updateServiceReviewDTO.message,
            'reviews.$[item].starRating': updateServiceReviewDTO.starRating,
            'reviews.$[item].userId': updateServiceReviewDTO.userId,
            'reviews.$[item].updated': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const reviewsData = await this.getServiceReview(id);

    return reviewsData;
  }

  async deleteServiceReview(
    id: string,
    itemId: string,
  ): Promise<ServiceReviewDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'reviews.$[item].deleted': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const reviewsData = await this.getServiceReview(id);

    return reviewsData;
  }

  async getServiceReview(id: string): Promise<ServiceReviewDTO[]> {
    const serviceData = await this.findOne(id);

    return serviceData.reviews;
  }
}
