import { DatabaseService } from '@src/database/database.service';
import { CreateCustomerDTO, CustomerDTO, FilterCustomerDTO, UpdateCustomerDTO } from './customer.dto';
export declare class CustomerService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createCustomerDTO: CreateCustomerDTO): Promise<CustomerDTO>;
    findAll(): Promise<CustomerDTO[]>;
    findByFilter(filterCustomerDTO: FilterCustomerDTO): Promise<CustomerDTO[]>;
    findOne(id: string): Promise<CustomerDTO>;
    update(id: string, updateCustomerDTO: UpdateCustomerDTO): Promise<CustomerDTO>;
    remove(id: string): Promise<boolean>;
}
