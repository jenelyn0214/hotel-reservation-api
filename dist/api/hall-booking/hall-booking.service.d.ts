import { DatabaseService } from '@src/database/database.service';
import { CreateHallBookingDTO, FilterHallBookingDTO, HallBookingDTO, UpdateHallBookingDTO } from './hall-booking.dto';
export declare class HallBookingService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createHallBookingDTO: CreateHallBookingDTO): Promise<HallBookingDTO>;
    findAll(): Promise<HallBookingDTO[]>;
    findByFilter(filterHallBookingDTO: FilterHallBookingDTO): Promise<HallBookingDTO[]>;
    findOne(id: string): Promise<HallBookingDTO>;
    update(id: string, updateHallBookingDTO: UpdateHallBookingDTO): Promise<HallBookingDTO>;
    remove(id: string): Promise<boolean>;
}
