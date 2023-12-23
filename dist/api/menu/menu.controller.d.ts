import { CreateMenuDTO, FilterMenuDTO, MenuDTO, UpdateMenuDTO } from './menu.dto';
import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly serviceMenu;
    constructor(serviceMenu: MenuService);
    create(createMenuDTO: CreateMenuDTO): Promise<MenuDTO>;
    findAll(): Promise<MenuDTO[]>;
    search(filterMenuDTO: FilterMenuDTO): Promise<MenuDTO[]>;
    findOne(id: string): Promise<MenuDTO>;
    update(id: string, updateMenuDTO: UpdateMenuDTO): Promise<MenuDTO>;
    remove(id: string): Promise<boolean>;
}
