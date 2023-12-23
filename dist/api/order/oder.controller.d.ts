import { CreateOrderDTO, FilterOrderDTO, OrderDTO, UpdateOrderDTO } from './order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly roomBookingService;
    constructor(roomBookingService: OrderService);
    create(createOrderDTO: CreateOrderDTO): Promise<OrderDTO>;
    findAll(): Promise<OrderDTO[]>;
    search(filterOrderDTO: FilterOrderDTO): Promise<OrderDTO[]>;
    findOne(id: string): Promise<OrderDTO>;
    update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<OrderDTO>;
    remove(id: string): Promise<boolean>;
}
