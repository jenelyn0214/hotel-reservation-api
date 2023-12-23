import { DatabaseService } from '@src/database/database.service';
import { CreateOrderMenuDTO, FilterOrderMenuDTO, OrderMenuDTO, UpdateOrderMenuDTO } from './order-menu.dto';
export declare class OrderMenuService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createOrderMenuDTO: CreateOrderMenuDTO): Promise<OrderMenuDTO>;
    findAll(): Promise<OrderMenuDTO[]>;
    findByFilter(filterOrderMenuDTO: FilterOrderMenuDTO): Promise<OrderMenuDTO[]>;
    findOne(id: string): Promise<OrderMenuDTO>;
    update(id: string, updateOrderMenuDTO: UpdateOrderMenuDTO): Promise<OrderMenuDTO>;
    remove(id: string): Promise<boolean>;
}
