import { DatabaseService } from '@src/database/database.service';
import { CreateQueueDTO, FilterQueueDTO, QueueDTO, UpdateQueueDTO } from './queue.dto';
export declare class QueueService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createQueueDTO: CreateQueueDTO): Promise<QueueDTO>;
    findAll(): Promise<QueueDTO[]>;
    findByFilter(filterQueueDTO: FilterQueueDTO): Promise<QueueDTO[]>;
    findOne(id: string): Promise<QueueDTO>;
    update(id: string, updateQueueDTO: UpdateQueueDTO): Promise<QueueDTO>;
    remove(id: string): Promise<boolean>;
}
