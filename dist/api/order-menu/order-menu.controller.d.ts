import { CreateOrderMenuDTO, FilterOrderMenuDTO, OrderMenuDTO, UpdateOrderMenuDTO } from './order-menu.dto';
import { OrderMenuService } from './order-menu.service';
export declare class OrderMenuController {
    private readonly roomBookingService;
    constructor(roomBookingService: OrderMenuService);
    create(createOrderMenuDTO: CreateOrderMenuDTO): Promise<OrderMenuDTO>;
    findAll(): Promise<OrderMenuDTO[]>;
    search(filterOrderMenuDTO: FilterOrderMenuDTO): Promise<OrderMenuDTO[]>;
    findOne(id: string): Promise<OrderMenuDTO>;
    update(id: string, updateOrderMenuDTO: UpdateOrderMenuDTO): Promise<OrderMenuDTO>;
    remove(id: string): Promise<boolean>;
}
