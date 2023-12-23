import { CreateCustomerDTO, CustomerDTO, FilterCustomerDTO, UpdateCustomerDTO } from './customer.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly serviceCustomer;
    constructor(serviceCustomer: CustomerService);
    create(createCustomerDTO: CreateCustomerDTO): Promise<CustomerDTO>;
    findAll(): Promise<CustomerDTO[]>;
    search(filterCustomerDTO: FilterCustomerDTO): Promise<CustomerDTO[]>;
    findOne(id: string): Promise<CustomerDTO>;
    update(id: string, updateCustomerDTO: UpdateCustomerDTO): Promise<CustomerDTO>;
    remove(id: string): Promise<boolean>;
}
