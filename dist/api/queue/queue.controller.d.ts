import { CreateQueueDTO, FilterQueueDTO, QueueDTO, UpdateQueueDTO } from './queue.dto';
import { QueueService } from './queue.service';
export declare class QueueController {
    private readonly serviceQueue;
    constructor(serviceQueue: QueueService);
    create(createQueueDTO: CreateQueueDTO): Promise<QueueDTO>;
    findAll(): Promise<QueueDTO[]>;
    search(filterQueueDTO: FilterQueueDTO): Promise<QueueDTO[]>;
    findOne(id: string): Promise<QueueDTO>;
    update(id: string, updateQueueDTO: UpdateQueueDTO): Promise<QueueDTO>;
    remove(id: string): Promise<boolean>;
}
