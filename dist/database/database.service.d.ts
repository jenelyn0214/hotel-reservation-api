import { ConfigType } from '@nestjs/config';
import mongoose from 'mongoose';
import dbConfig from '@src/config/database.config';
export declare class DatabaseService {
    private readonly databaseConfig;
    private dbInstance;
    constructor(databaseConfig: ConfigType<typeof dbConfig>);
    connect(): Promise<void>;
    db(): typeof mongoose;
}
