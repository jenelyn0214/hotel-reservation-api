import { Injectable } from '@nestjs/common';

import { UserService } from '@src/api/user/user.service';

import { users } from './data';

@Injectable()
export class Seeder {
  constructor(private readonly userService: UserService) {}
  async seed() {
    try {
      await this.userSeeder();
      console.debug('Successfuly completed seeding...');
    } catch (error) {
      console.log('error', error);
      console.error('Failed seeding...');
    }
  }

  async userSeeder() {
    return await Promise.all(
      await users.map(async (user) => {
        await this.userService.create(user);
      }),
    )
      .then(() => {
        console.debug('Users that were created', users);
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
