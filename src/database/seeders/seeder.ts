import { Injectable } from '@nestjs/common';

import { CompanyInformationService } from '@src/api/company-information/company-information.service';
import { PropertyManagementService } from '@src/api/property-management/property-management.service';
import { RoleService } from '@src/api/role/role.service';
import { CreateUserPermissionDTO } from '@src/api/user-permission/user-permission.dto';
import { UserPermissionService } from '@src/api/user-permission/user-permission.service';
import { UserService } from '@src/api/user/user.service';
import {
  PropertyManagementBPItemEnum,
  PropertyManagementItemEnum,
} from '@src/enums';

import {
  companyInformation,
  defaultPropertyManagement,
  propertyManagement,
  roles,
  users,
} from './data';

@Injectable()
export class Seeder {
  constructor(
    private readonly userService: UserService,
    private readonly companyInformationService: CompanyInformationService,
    private readonly roleService: RoleService,
    private readonly propertyManagementService: PropertyManagementService,
    private readonly userPermissionService: UserPermissionService,
  ) {}
  async seed() {
    try {
      await this.companyInformationSeeder();
      await this.rolesSeeder();
      await this.propertyManagementSeeder();
      await this.userSeeder();
      console.debug('Successfuly completed seeding...');
    } catch (error) {
      console.log('error', error);
      console.error('Failed seeding...');
    }
  }

  async userSeeder() {
    return await Promise.all(
      users.map(async (user) => {
        const userData = await this.userService.createForSeed(user);

        const roles = await this.roleService.findAll();

        const role = roles.find((item) => item.role === 'super admin');

        const userPermission: CreateUserPermissionDTO = {
          roleId: role.id,
          permission: role.defaultPermissions,
          userId: userData.id,
        };

        await this.userPermissionService.create(userPermission);
      }),
    )
      .then(() => {
        console.debug('Users that were created', users);
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async companyInformationSeeder() {
    try {
      await Promise.all(
        companyInformation.map(async (info) => {
          await this.companyInformationService.create(info);
        }),
      );

      console.debug(
        'Company Information that were created',
        companyInformation,
      );
    } catch (error) {
      console.error('Error in seeding company information', error);
      Promise.reject(error);
    }
  }

  async rolesSeeder() {
    try {
      await Promise.all(
        roles.map(async (role) => {
          await this.roleService.create(role);
        }),
      );

      console.debug('Roles that were created', roles);
    } catch (error) {
      console.error('Error in seeding roles', error);
      Promise.reject(error);
    }
  }

  async propertyManagementSeeder() {
    try {
      await this.propertyManagementService.create(defaultPropertyManagement);

      await Promise.all(
        propertyManagement.propertyType.map(async (item) => {
          await this.propertyManagementService.createPropertyManagementItem(
            PropertyManagementItemEnum.PROPERTY_TYPE,
            item,
          );
        }),
      );

      await Promise.all(
        propertyManagement.percentageIncrease.map(async (item) => {
          await this.propertyManagementService.createPropertyManagementItem(
            PropertyManagementItemEnum.PERCENTAGE_INCREASE,
            item,
          );
        }),
      );

      await Promise.all(
        propertyManagement.increaseType.map(async (item) => {
          await this.propertyManagementService.createPropertyManagementItem(
            PropertyManagementItemEnum.INCREASE_TYPE,
            item,
          );
        }),
      );

      await Promise.all(
        propertyManagement.durationStay.map(async (item) => {
          await this.propertyManagementService.createPropertyManagementItem(
            PropertyManagementItemEnum.DURATION_STAY,
            item,
          );
        }),
      );

      await Promise.all(
        propertyManagement.billingTypes.map(async (item) => {
          await this.propertyManagementService.createPropertyManagementItem(
            PropertyManagementItemEnum.BILLING_TYPES,
            item,
          );
        }),
      );

      const management = await this.propertyManagementService.findAll();

      await Promise.all(
        propertyManagement.advances.map(async (item) => {
          const billingType = management.billingTypes.find(
            (type) => type.name === item.billingTypeId,
          );
          await this.propertyManagementService.createPropertyManagementBPItem(
            PropertyManagementBPItemEnum.ADVANCES,
            {
              ...item,
              billingTypeId: billingType.id,
            },
          );
        }),
      );

      await Promise.all(
        propertyManagement.rentalAdvances.map(async (item) => {
          const billingType = management.billingTypes.find(
            (type) => type.name === item.billingTypeId,
          );
          await this.propertyManagementService.createPropertyManagementBPItem(
            PropertyManagementBPItemEnum.RENTAL_ADVANCES,
            {
              ...item,
              billingTypeId: billingType.id,
            },
          );
        }),
      );

      await Promise.all(
        propertyManagement.offerTypes.map(async (item) => {
          await this.propertyManagementService.createPropertyManagementOfferItem(
            item,
          );
        }),
      );

      console.debug(
        'Property Management that were created',
        propertyManagement,
      );
    } catch (error) {
      console.error('Error in seeding property Management', error);
      Promise.reject(error);
    }
  }
}
