import { DatabaseService } from '@src/database/database.service';
import { CreateServiceDTO, FilterServiceDTO, ServiceDTO, UpdateServiceDTO } from './service.dto';
export declare class ServiceService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createServiceDTO: CreateServiceDTO): Promise<ServiceDTO>;
    findAll(): Promise<ServiceDTO[]>;
    findByFilter(filterServiceDTO: FilterServiceDTO): Promise<ServiceDTO[]>;
    findOne(id: string): Promise<ServiceDTO>;
    update(id: string, updateServiceDTO: UpdateServiceDTO): Promise<ServiceDTO>;
    remove(id: string): Promise<boolean>;
}
