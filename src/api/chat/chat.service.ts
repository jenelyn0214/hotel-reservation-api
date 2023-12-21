import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import { ChatSchema, IChatDoc } from '@src/schema/chat.schema';

import {
  ChatDTO,
  ChatItemDTO,
  CreateChatDTO,
  CreateChatItemDTO,
  FilterChatDTO,
  UpdateChatDTO,
  UpdateChatItemDTO,
} from './chat.dto';

@Injectable()
export class ChatService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.Chat || model<IChatDoc>('Chat', ChatSchema);
  }
  async create(createChatDTO: CreateChatDTO): Promise<ChatDTO> {
    const chat = await this.serviceModel.create(createChatDTO);

    return chat.toJSON() as ChatDTO;
  }

  async findAll(): Promise<ChatDTO[]> {
    const chatsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const chats = chatsResult.map((u) => u.toJSON() as ChatDTO);

    return chats;
  }

  async findByFilter(filterChatDTO: FilterChatDTO): Promise<ChatDTO[]> {
    const chatsResult = await this.serviceModel
      .find({ ...filterChatDTO, deleted: null })
      .exec();

    const chats = chatsResult.map((u) => u.toJSON() as ChatDTO);

    return chats;
  }

  async findOne(id: string): Promise<ChatDTO> {
    const chatResult = await this.serviceModel.findOne({ _id: id }).exec();

    const chat: ChatDTO = chatResult.toJSON() as ChatDTO;

    return chat;
  }

  async update(id: string, updateChatDTO: UpdateChatDTO): Promise<ChatDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateChatDTO,
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

  async createChatItem(
    id: string,
    createChatItemDTO: CreateChatItemDTO,
  ): Promise<ChatItemDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $addToSet: {
            chats: createChatItemDTO,
          },
        },
      )
      .exec();

    const chatData = await this.findOne(id);

    return chatData.chats;
  }

  async updateChatItem(
    id: string,
    itemId: string,
    updateChatItemDTO: UpdateChatItemDTO,
  ): Promise<ChatItemDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'chats.$[item].attachment': updateChatItemDTO.attachment,
            'chats.$[item].fromUserId': updateChatItemDTO.fromUserId,
            'chats.$[item].message': updateChatItemDTO.message,
            'chats.$[item].read': updateChatItemDTO.read,
            'chats.$[item].toUserId': updateChatItemDTO.toUserId,
            'chats.$[item].updated': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();

    const chatData = await this.findOne(id);

    return chatData.chats;
  }

  async deleteChatItem(id: string, itemId: string): Promise<ChatItemDTO[]> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          $set: {
            'members.$[item].deleted': Date.now(),
          },
        },
        {
          arrayFilters: [{ 'item._id': itemId }],
        },
      )
      .exec();
    const chatData = await this.findOne(id);

    return chatData.chats;
  }
}
