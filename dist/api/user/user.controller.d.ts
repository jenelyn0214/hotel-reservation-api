import { CreateUserDTO, FilterUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDTO: CreateUserDTO): Promise<UserDTO>;
    findAll(): Promise<UserDTO[]>;
    search(filterUserDTO: FilterUserDTO): Promise<UserDTO[]>;
    findOne(id: string): Promise<UserDTO>;
    update(id: string, updateUserDTO: UpdateUserDTO): Promise<UserDTO>;
    remove(id: string): Promise<boolean>;
}
