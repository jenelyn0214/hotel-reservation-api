import { DatabaseService } from '@src/database/database.service';
import { CreateMenuDTO, FilterMenuDTO, MenuDTO, UpdateMenuDTO } from './menu.dto';
export declare class MenuService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createMenuDTO: CreateMenuDTO): Promise<MenuDTO>;
    findAll(): Promise<MenuDTO[]>;
    findByFilter(filterMenuDTO: FilterMenuDTO): Promise<MenuDTO[]>;
    findOne(id: string): Promise<MenuDTO>;
    update(id: string, updateMenuDTO: UpdateMenuDTO): Promise<MenuDTO>;
    remove(id: string): Promise<boolean>;
}
