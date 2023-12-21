import { Injectable } from '@nestjs/common';
import { Model, model } from 'mongoose';

import { DatabaseService } from '@src/database/database.service';
import {
  CompanyInformationSchema,
  ICompanyInformationDoc,
} from '@src/schema/company-information.schema';

import {
  CompanyInformationDTO,
  CreateCompanyInformationDTO,
  UpdateCompanyInformationDTO,
} from './company-information.dto';

@Injectable()
export class CompanyInformationService {
  private serviceModel: typeof Model;
  constructor(private readonly dbService: DatabaseService) {
    this.serviceModel =
      this.dbService.db()?.models.CompanyInformation ||
      model<ICompanyInformationDoc>(
        'CompanyInformation',
        CompanyInformationSchema,
      );
  }
  async create(
    createCompanyInformationDTO: CreateCompanyInformationDTO,
  ): Promise<CompanyInformationDTO> {
    const companyInformation = await this.serviceModel.create(
      createCompanyInformationDTO,
    );

    return companyInformation.toJSON() as CompanyInformationDTO;
  }

  async findAll(): Promise<CompanyInformationDTO[]> {
    const companyInformationsResult = await this.serviceModel
      .find({
        deleted: null,
      })
      .exec();

    const companyInformations = companyInformationsResult.map(
      (u) => u.toJSON() as CompanyInformationDTO,
    );

    return companyInformations;
  }

  async findOne(id: string): Promise<CompanyInformationDTO> {
    const companyInformation = await this.serviceModel
      .findOne({ _id: id })
      .exec();

    return companyInformation.toJSON() as CompanyInformationDTO;
  }

  async update(
    id: string,
    updateCompanyInformationDTO: UpdateCompanyInformationDTO,
  ): Promise<CompanyInformationDTO> {
    await this.serviceModel
      .updateOne(
        { _id: id },
        {
          ...updateCompanyInformationDTO,
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
