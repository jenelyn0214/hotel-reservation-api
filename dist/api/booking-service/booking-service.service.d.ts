import { DatabaseService } from '@src/database/database.service';
import { BookingServiceDTO, CreateBookingServiceDTO, FilterBookingServiceDTO, UpdateBookingServiceDTO } from './booking-service.dto';
export declare class BookingServiceService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createBookingServiceDTO: CreateBookingServiceDTO): Promise<BookingServiceDTO>;
    findAll(): Promise<BookingServiceDTO[]>;
    findByFilter(filterBookingServiceDTO: FilterBookingServiceDTO): Promise<BookingServiceDTO[]>;
    findOne(id: string): Promise<BookingServiceDTO>;
    update(id: string, updateBookingServiceDTO: UpdateBookingServiceDTO): Promise<BookingServiceDTO>;
    remove(id: string): Promise<boolean>;
}
