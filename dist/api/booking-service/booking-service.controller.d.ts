import { BookingServiceDTO, CreateBookingServiceDTO, FilterBookingServiceDTO, UpdateBookingServiceDTO } from './booking-service.dto';
import { BookingServiceService } from './booking-service.service';
export declare class BookingServiceController {
    private readonly bookingServiceService;
    constructor(bookingServiceService: BookingServiceService);
    create(createBookingServiceDTO: CreateBookingServiceDTO): Promise<BookingServiceDTO>;
    findAll(): Promise<BookingServiceDTO[]>;
    search(filterBookingServiceDTO: FilterBookingServiceDTO): Promise<BookingServiceDTO[]>;
    findOne(id: string): Promise<BookingServiceDTO>;
    update(id: string, updateBookingServiceDTO: UpdateBookingServiceDTO): Promise<BookingServiceDTO>;
    remove(id: string): Promise<boolean>;
}
