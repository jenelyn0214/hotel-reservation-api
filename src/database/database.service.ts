import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import mongoose from 'mongoose';

import dbConfig from '@src/config/database.config';

@Injectable()
export class DatabaseService {
  private dbInstance: typeof mongoose;
  constructor(
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
  ) {
    if (!this.databaseConfig.databaseURI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env',
      );
    }

    this.connect();
  }

  async connect() {
    await mongoose
      .connect(this.databaseConfig.databaseURI)
      .catch((err) => {
        throw new Error(
          `Initial Distribution API Database connection error occured -` + err,
        );
      })
      .then((result) => {
        this.dbInstance = result;
        console.log('Database connection Succeeded');
      });

    mongoose.set('debug', true);
  }

  db() {
    if (this.dbInstance) return this.dbInstance;
  }
}
