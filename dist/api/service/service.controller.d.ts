import { CreateServiceDTO, FilterServiceDTO, ServiceDTO, UpdateServiceDTO } from './service.dto';
import { ServiceService } from './service.service';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(createServiceDTO: CreateServiceDTO): Promise<ServiceDTO>;
    findAll(): Promise<ServiceDTO[]>;
    search(filterServiceDTO: FilterServiceDTO): Promise<ServiceDTO[]>;
    findOne(id: string): Promise<ServiceDTO>;
    update(id: string, updateServiceDTO: UpdateServiceDTO): Promise<ServiceDTO>;
    remove(id: string): Promise<boolean>;
}
