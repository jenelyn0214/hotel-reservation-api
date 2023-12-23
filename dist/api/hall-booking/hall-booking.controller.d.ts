import { CreateHallBookingDTO, FilterHallBookingDTO, HallBookingDTO, UpdateHallBookingDTO } from './hall-booking.dto';
import { HallBookingService } from './hall-booking.service';
export declare class HallBookingController {
    private readonly hallBookingService;
    constructor(hallBookingService: HallBookingService);
    create(createHallBookingDTO: CreateHallBookingDTO): Promise<HallBookingDTO>;
    findAll(): Promise<HallBookingDTO[]>;
    search(filterHallBookingDTO: FilterHallBookingDTO): Promise<HallBookingDTO[]>;
    findOne(id: string): Promise<HallBookingDTO>;
    update(id: string, updateHallBookingDTO: UpdateHallBookingDTO): Promise<HallBookingDTO>;
    remove(id: string): Promise<boolean>;
}
