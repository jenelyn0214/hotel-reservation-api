import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { IDTypeEnum, TicketStatusEnum, TicketTypeEnum } from '@src/enums';
import { ITicketDoc, TicketSchema } from '@src/schema/ticket.schema';
import { generateContinuousID } from '@src/util/id-generator';

import {
  CreateTicketCommentDTO,
  CreateTicketDTO,
  FilterTicketDTO,
  TicketCommentDTO,
  TicketDTO,
  UpdateTicketCommentDTO,
  UpdateTicketDTO,
} from './ticket.dto';

@Injectable()
export class TicketService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Ticket ||
      model<ITicketDoc>('Ticket', TicketSchema);
  }
  async create(createTicketDTO: CreateTicketDTO): Promise<TicketDTO> {
    const TID = await generateContinuousID(
      IDTypeEnum.TICKET,
      await this.getLastID(),
    );

    const ticket = await this.serviceModel.create({
      ...createTicketDTO,
      TID,
    });

    return ticket.toJSON() as TicketDTO;
  }

  async findAll(): Promise<TicketDTO[]> {
    const ticketsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const tickets = ticketsResult.map((u) => u.toJSON() as TicketDTO);

    const ticketData = tickets.map((item) => {
      const comments = item.comments.filter((comment) => !comment.deleted);

      return {
        ...item,
        comments,
      };
    });

    return ticketData;
  }

  async findByFilter(filterTicketDTO: FilterTicketDTO): Promise<TicketDTO[]> {
    const ticketsResult = await this.serviceModel
      .find({ ...filterTicketDTO, deleted: null })
      .exec();

    const tickets = ticketsResult.map((u) => u.toJSON() as TicketDTO);

    const ticketData = tickets.map((item) => {
      const comments = item.comments.filter((comment) => !comment.deleted);

      return {
        ...item,
        comments,
      };
    });

    return ticketData;
  }

  async findOne(id: string): Promise<TicketDTO> {
    const ticket = await this.serviceModel.findOne({ _id: id }).exec();

    const comments = ticket.comments.filter((comment) => !comment.deleted);

    const ticketData = {
      ...ticket.toJSON(),
      comments,
    };

    return ticketData;
  }

  async update(
    id: string,
    updateTicketDTO: UpdateTicketDTO,
  ): Promise<TicketDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateTicketDTO,
          updated: Date.now(),
          closed:
            updateTicketDTO.status === TicketStatusEnum.CLOSED
              ? Date.now()
              : null,
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

  async createTicketComment(
    id: string,
    createTicketCommentDTO: CreateTicketCommentDTO,
  ): Promise<TicketCommentDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $addToSet: {
            comments: createTicketCommentDTO,
          },
        },
      )
      .exec();

    const ticketData = await this.findOne(id);

    return ticketData.comments;
  }

  async updateTicketComment(
    id: string,
    itemId: string,
    updateTicketCommentDTO: UpdateTicketCommentDTO,
  ): Promise<TicketCommentDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'comments.$[item].attachment': updateTicketCommentDTO.attachment,
            'comments.$[item].comment': updateTicketCommentDTO.comment,
            'comments.$[item].userId': updateTicketCommentDTO.userId,
            'comments.$[item].updated': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const ticketData = await this.findOne(id);

    return ticketData.comments;
  }

  async deleteTicketComment(
    id: string,
    itemId: string,
  ): Promise<TicketCommentDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'comments.$[item].deleted': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const ticketData = await this.findOne(id);

    return ticketData.comments;
  }

  async getTicketsByPropertyOwner(userId: string): Promise<TicketDTO[]> {
    const tickets = await this.findAll();

    const filteredResult = tickets.filter(
      (ticket) =>
        ticket?.room?.property?.userId === userId &&
        ticket.type === TicketTypeEnum.PROPERTY,
    );

    return filteredResult;
  }

  getLastID = async (): Promise<string | null> => {
    const rent: TicketDTO = await this.serviceModel
      .findOne({ TID: { $ne: null } })
      .sort({
        TID: -1,
      })
      .lean()
      .exec();

    return rent?.TID ?? null;
  };
}
