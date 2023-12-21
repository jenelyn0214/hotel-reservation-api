import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Model, model } from 'mongoose';

import cConfig from '@src/config/common.config';
import emailConfig from '@src/config/emailjs.config';
import { DatabaseService } from '@src/database/database.service';
import { UserIDEnum, UserIDTypeEnum } from '@src/enums';
import { IConfimationEmailParams, IUser } from '@src/interfaces';
import { IUserDoc, UserSchema } from '@src/schema/user.schema';
import { generateUserID } from '@src/util/id-generator';
import { encryptPassword } from '@src/util/password';
import { sendEmail } from '@src/util/send-email';

import { UserIDRequestDTO } from '../user-id-request/user-id-request.dto';
import {
  CreateUserDTO,
  FilterUserDTO,
  UpdateUserDTO,
  UserDTO,
} from './user.dto';

@Injectable()
export class UserService {
  private serviceModel: typeof Model;

  constructor(
    @Inject(cConfig.KEY)
    private readonly commonConfig: ConfigType<typeof cConfig>,
    @Inject(emailConfig.KEY)
    private readonly emailJsConfig: ConfigType<typeof emailConfig>,
    private readonly dbService: DatabaseService,
  ) {
    this.serviceModel =
      this.dbService.db()?.models.User || model<IUserDoc>('User', UserSchema);
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const iblNumber = await generateUserID(
      UserIDEnum.iBL,
      await this.getLastID(UserIDEnum.iBL),
    );

    const iRNumber =
      createUserDTO.type == UserIDTypeEnum.iRENT
        ? await generateUserID(
            UserIDEnum.iRENT,
            await this.getLastID(UserIDEnum.iRENT),
          )
        : null;

    const iSNumber =
      createUserDTO.type == UserIDTypeEnum.iSERVE
        ? await generateUserID(
            UserIDEnum.iSERVE,
            await this.getLastID(UserIDEnum.iSERVE),
          )
        : null;

    const iMNumber =
      createUserDTO.type == UserIDTypeEnum.iMANAGE
        ? await generateUserID(
            UserIDEnum.iMANAGE,
            await this.getLastID(UserIDEnum.iMANAGE),
          )
        : null;

    const iMRNumber =
      createUserDTO.type == UserIDTypeEnum.iMANAGER
        ? await generateUserID(
            UserIDEnum.iMANAGER,
            await this.getLastID(UserIDEnum.iMANAGER),
          )
        : null;

    const iENumber =
      createUserDTO.type == UserIDTypeEnum.iEMPLOYEE
        ? await generateUserID(
            UserIDEnum.iEMPLOYEE,
            await this.getLastID(UserIDEnum.iEMPLOYEE),
          )
        : null;

    const iPNumber =
      createUserDTO.type == UserIDTypeEnum.iPARTNER
        ? await generateUserID(
            UserIDEnum.iPARTNER,
            await this.getLastID(UserIDEnum.iPARTNER),
          )
        : null;

    const password = encryptPassword(createUserDTO.password);

    const fullName =
      createUserDTO.firstName +
      ' ' +
      (createUserDTO.middleName ? createUserDTO.middleName[0] + '. ' : '') +
      createUserDTO.lastName;

    const user = await this.serviceModel.create({
      ...createUserDTO,
      iblNumber,
      iRNumber,
      iSNumber,
      iMNumber,
      iMRNumber,
      iENumber,
      iPNumber,
      password,
      fullName,
      confirmed: false,
    });

    const emailParams: IConfimationEmailParams = {
      toEmail: user.email,
      toName: user.firstName,
      link: `${this.commonConfig.app.client}/confirmation/${user.id}`,
    };

    await sendEmail(
      this.emailJsConfig,
      this.emailJsConfig.confirmationTemplateId,
      emailParams,
    );

    return user.toJSON() as UserDTO;
  }

  async findAll(): Promise<UserDTO[]> {
    const usersResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const users = usersResult.map((u) => u.toJSON() as UserDTO);

    return users;
  }

  async findByFilter(filterUserDTO: FilterUserDTO): Promise<UserDTO[]> {
    const { createdFrom, createdTo, ...filters } = filterUserDTO;

    let filterData = {
      ...filters,
      deleted: null,
    } as unknown as any;

    if (createdFrom && createdTo) {
      createdTo.setHours(23, 59, 59, 999);
      filterData = {
        ...filterData,
        created: { $gte: createdFrom, $lte: createdTo },
      };
    }

    const usersResult = await this.serviceModel.find(filterData).exec();

    const users = usersResult.map((u) => u.toJSON() as UserDTO);

    return users;
  }

  async findOne(id: string): Promise<UserDTO> {
    const user = await this.serviceModel.findOne({ _id: id }).exec();

    return user.toJSON() as UserDTO;
  }

  async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
    updateLogin?: boolean,
  ): Promise<UserDTO> {
    const user: UserDTO = await this.findOne(id);

    const dataToUpdate = { ...updateUserDTO, updated: Date.now() };

    const firstName = dataToUpdate.firstName ?? user.firstName;
    const middleName = dataToUpdate.middleName ?? user.middleName;
    const lastName = dataToUpdate.lastName ?? user.lastName;

    const fullName =
      firstName + ' ' + (middleName ? middleName[0] + '. ' : '') + lastName;

    const login = updateLogin ? Date.now() : null;

    const password = updateUserDTO.password
      ? encryptPassword(updateUserDTO.password)
      : user.password;

    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...dataToUpdate,
          fullName,
          login,
          password,
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

  getLastID = async (type: UserIDEnum): Promise<string | null> => {
    const user: UserDTO = await this.serviceModel
      .findOne({ [type]: { $ne: null } })
      .sort({
        [type]: -1,
      })
      .lean()
      .exec();

    return (user && user[type]) ?? null;
  };

  generateUserTypeAccount = async (id: string, userType: UserIDTypeEnum) => {
    const user: UserDTO = await this.findOne(id);

    const iRNumber =
      userType == UserIDTypeEnum.iRENT
        ? await generateUserID(
            UserIDEnum.iRENT,
            await this.getLastID(UserIDEnum.iRENT),
          )
        : user.iRNumber;

    const iSNumber =
      userType == UserIDTypeEnum.iSERVE
        ? await generateUserID(
            UserIDEnum.iSERVE,
            await this.getLastID(UserIDEnum.iSERVE),
          )
        : user.iSNumber;

    const iMNumber =
      userType == UserIDTypeEnum.iMANAGE
        ? await generateUserID(
            UserIDEnum.iMANAGE,
            await this.getLastID(UserIDEnum.iMANAGE),
          )
        : user.iMNumber;

    const toBeUpdated = {
      updated: Date.now(),
      additionalType: userType,
      iRNumber,
      iSNumber,
      iMNumber,
    };

    await this.serviceModel.updateOne({ _id: id }, toBeUpdated).exec();
  };

  async createForSeed(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const iblNumber = await generateUserID(
      UserIDEnum.iBL,
      await this.getLastID(UserIDEnum.iBL),
    );

    const iRNumber =
      createUserDTO.type == UserIDTypeEnum.iRENT
        ? await generateUserID(
            UserIDEnum.iRENT,
            await this.getLastID(UserIDEnum.iRENT),
          )
        : null;

    const iSNumber =
      createUserDTO.type == UserIDTypeEnum.iSERVE
        ? await generateUserID(
            UserIDEnum.iSERVE,
            await this.getLastID(UserIDEnum.iSERVE),
          )
        : null;

    const iMNumber =
      createUserDTO.type == UserIDTypeEnum.iMANAGE
        ? await generateUserID(
            UserIDEnum.iMANAGE,
            await this.getLastID(UserIDEnum.iMANAGE),
          )
        : null;

    const iMRNumber =
      createUserDTO.type == UserIDTypeEnum.iMANAGER
        ? await generateUserID(
            UserIDEnum.iMANAGER,
            await this.getLastID(UserIDEnum.iMANAGER),
          )
        : null;

    const iENumber =
      createUserDTO.type == UserIDTypeEnum.iEMPLOYEE
        ? await generateUserID(
            UserIDEnum.iEMPLOYEE,
            await this.getLastID(UserIDEnum.iEMPLOYEE),
          )
        : null;

    const iPNumber =
      createUserDTO.type == UserIDTypeEnum.iPARTNER
        ? await generateUserID(
            UserIDEnum.iPARTNER,
            await this.getLastID(UserIDEnum.iPARTNER),
          )
        : null;

    const password = encryptPassword(createUserDTO.password);

    const fullName =
      createUserDTO.firstName +
      ' ' +
      (createUserDTO.middleName ? createUserDTO.middleName[0] + '. ' : '') +
      createUserDTO.lastName;

    const user = await this.serviceModel.create({
      ...createUserDTO,
      iblNumber,
      iRNumber,
      iSNumber,
      iMNumber,
      iMRNumber,
      iENumber,
      iPNumber,
      password,
      fullName,
    });

    return user.toJSON() as UserDTO;
  }

  updateIdInformation = async (idRequest: UserIDRequestDTO) => {
    const { IDPath, validIDNo, dateIssued, placeIssued } = idRequest;

    const idFormData: Partial<IUser> = {
      validIDNo,
      dateIssued,
      placeIssued,
      IDPath,
    };

    await this.update(idRequest.userId, idFormData);
  };
}
