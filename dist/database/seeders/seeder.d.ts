import { UserService } from '@src/api/user/user.service';
export declare class Seeder {
    private readonly userService;
    constructor(userService: UserService);
    seed(): Promise<void>;
    userSeeder(): Promise<boolean>;
}
