import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IQueueDoc, QueueSchema } from '@src/schema/queue.schema';

import {
  CreateQueueDTO,
  FilterQueueDTO,
  QueueDTO,
  UpdateQueueDTO,
} from './queue.dto';

@Injectable()
export class QueueService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Service ||
      model<IQueueDoc>('Queue', QueueSchema);
  }
  async create(createQueueDTO: CreateQueueDTO): Promise<QueueDTO> {
    const queueType = await this.serviceModel.create(createQueueDTO);

    return queueType.toJSON() as QueueDTO;
  }

  async findAll(): Promise<QueueDTO[]> {
    const queueTypesResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const queueTypes = queueTypesResult.map((u) => u.toJSON() as QueueDTO);

    return queueTypes;
  }

  async findByFilter(filterQueueDTO: FilterQueueDTO): Promise<QueueDTO[]> {
    const queueTypesResult = await this.serviceModel
      .find({ ...filterQueueDTO, deleted: null })
      .exec();

    const queueTypes = queueTypesResult.map((u) => u.toJSON() as QueueDTO);

    return queueTypes;
  }

  async findOne(id: string): Promise<QueueDTO> {
    const service = await this.serviceModel.findOne({ _id: id }).exec();

    return service.toJSON() as QueueDTO;
  }

  async update(id: string, updateQueueDTO: UpdateQueueDTO): Promise<QueueDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateQueueDTO,
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
