import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum } from '@src/enums';
import { IRoomDoc, RoomSchema } from '@src/schema/room.schema';
import { generateContinuousID } from '@src/util/id-generator';
import { generateSlug } from '@src/util/slug-generator';

import {
  CreateRoomDTO,
  CreateRoomReviewDTO,
  FilterRoomDTO,
  RoomDTO,
  RoomReviewDTO,
  UpdateRoomDTO,
  UpdateRoomReviewDTO,
} from './room.dto';

@Injectable()
export class RoomService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Room || model<IRoomDoc>('Room', RoomSchema);
  }
  async create(createRoomDTO: CreateRoomDTO): Promise<RoomDTO> {
    const ROID = await generateContinuousID(
      IDTypeEnum.ROOM,
      await this.getLastID(),
    );

    const room = await this.serviceModel.create({
      ...createRoomDTO,
      ROID,
      slug: 'slug',
    });

    const roomData: RoomDTO = room.toJSON() as RoomDTO;

    const updatedSlugData = await this.updateSlug(roomData.id);

    return updatedSlugData;
  }

  async findAll(): Promise<RoomDTO[]> {
    const roomsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const rooms = roomsResult.map((u) => u.toJSON() as RoomDTO);

    return rooms;
  }

  async findByFilter(filterRoomDTO: FilterRoomDTO): Promise<RoomDTO[]> {
    const roomsResult = await this.serviceModel
      .find({ ...filterRoomDTO, deleted: null })
      .exec();

    const rooms = roomsResult.map((u) => u.toJSON() as RoomDTO);

    return rooms;
  }

  async findOne(id: string): Promise<RoomDTO> {
    const roomResult = await this.serviceModel.findOne({ _id: id }).exec();

    const room: RoomDTO = roomResult.toJSON() as RoomDTO;

    return room;
  }

  async findSlug(slug: string): Promise<RoomDTO> {
    const roomResult = await this.serviceModel.findOne({ slug }).exec();

    const room: RoomDTO = roomResult.toJSON() as RoomDTO;

    return room;
  }

  async update(id: string, updateRoomDTO: UpdateRoomDTO): Promise<RoomDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateRoomDTO,
          updated: Date.now(),
        },
      )
      .exec();

    const updatedSlugData = await this.updateSlug(id);

    return updatedSlugData;
  }

  updateSlug = async (id: string): Promise<RoomDTO> => {
    const room: RoomDTO = await this.findOne(id);

    let slug = '';
    let length = 5;

    while (!slug) {
      const generatedSlug = generateSlug(room.name, length, id);
      const roomResult = await this.serviceModel
        .findOne({ slug: generatedSlug })
        .exec();

      if (!roomResult) {
        slug = generatedSlug;
      } else {
        length++;
      }
    }

    await this.serviceModel.updateOne({ _id: id }, { slug }).exec();

    return {
      ...room,
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
    const room: RoomDTO = await this.serviceModel
      .findOne({ ROID: { $ne: null } })
      .sort({
        ROID: -1,
      })
      .lean()
      .exec();

    return room?.ROID ?? null;
  };

  async getRoomsByPropertyOwner(userId: string): Promise<RoomDTO[]> {
    const rooms = await this.findAll();

    const filteredResult = rooms.filter(
      (room) => room?.property?.userId === userId,
    );

    return filteredResult;
  }

  async createRoomReview(
    id: string,
    createRoomReviewDTO: CreateRoomReviewDTO,
  ): Promise<RoomReviewDTO[]> {
    const reviewsData = await this.getRoomReview(id);

    const userReviewResult = reviewsData.find(
      ({ userId }) => userId === createRoomReviewDTO.userId,
    );

    if (!userReviewResult) {
      await this.serviceModel
        .updateOne(
          { _id: id },
          {
            $addToSet: {
              reviews: createRoomReviewDTO,
            },
          },
        )
        .exec();
    } else {
      await this.updateRoomReview(id, userReviewResult.id, createRoomReviewDTO);
    }

    const updatedReviewsData = await this.getRoomReview(id);

    return updatedReviewsData;
  }

  async updateRoomReview(
    id: string,
    itemId: string,
    updateRoomReviewDTO: UpdateRoomReviewDTO,
  ): Promise<RoomReviewDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'reviews.$[item].message': updateRoomReviewDTO.message,
            'reviews.$[item].starRating': updateRoomReviewDTO.starRating,
            'reviews.$[item].userId': updateRoomReviewDTO.userId,
            'reviews.$[item].response': updateRoomReviewDTO.response,
            'reviews.$[item].updated': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const reviewsData = await this.getRoomReview(id);

    return reviewsData;
  }

  async deleteRoomReview(id: string, itemId: string): Promise<RoomReviewDTO[]> {
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

    const reviewsData = await this.getRoomReview(id);

    return reviewsData;
  }

  async getRoomReview(id: string): Promise<RoomReviewDTO[]> {
    const roomData = await this.findOne(id);

    return roomData.reviews;
  }
}
