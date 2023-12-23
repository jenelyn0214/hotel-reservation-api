import { QueueService } from '@src/api/queue/queue.service';
import { DatabaseService } from '@src/database/database.service';
import { CreateOrderDTO, FilterOrderDTO, OrderDTO, UpdateOrderDTO } from './order.dto';
export declare class OrderService {
    private readonly dbService;
    private readonly queueService;
    private serviceModel;
    constructor(dbService: DatabaseService, queueService: QueueService);
    create(createOrderDTO: CreateOrderDTO): Promise<OrderDTO>;
    findAll(): Promise<OrderDTO[]>;
    findByFilter(filterOrderDTO: FilterOrderDTO): Promise<OrderDTO[]>;
    findOne(id: string): Promise<OrderDTO>;
    update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<OrderDTO>;
    remove(id: string): Promise<boolean>;
}
