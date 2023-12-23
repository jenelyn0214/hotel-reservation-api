import { ConfigType } from '@nestjs/config';
import cConfig from '@src/config/common.config';
import { DatabaseService } from '@src/database/database.service';
import { CreateUserDTO, FilterUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
export declare class UserService {
    private readonly commonConfig;
    private readonly dbService;
    private serviceModel;
    constructor(commonConfig: ConfigType<typeof cConfig>, dbService: DatabaseService);
    create(createUserDTO: CreateUserDTO): Promise<UserDTO>;
    findAll(): Promise<UserDTO[]>;
    findByFilter(filterUserDTO: FilterUserDTO): Promise<UserDTO[]>;
    findOne(id: string): Promise<UserDTO>;
    update(id: string, updateUserDTO: UpdateUserDTO, updateLogin?: boolean): Promise<UserDTO>;
    remove(id: string): Promise<boolean>;
}
