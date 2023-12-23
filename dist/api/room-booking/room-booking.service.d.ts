import { DatabaseService } from '@src/database/database.service';
import { CreateRoomBookingDTO, FilterRoomBookingDTO, RoomBookingDTO, UpdateRoomBookingDTO } from './room-booking.dto';
export declare class RoomBookingService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createRoomBookingDTO: CreateRoomBookingDTO): Promise<RoomBookingDTO>;
    findAll(): Promise<RoomBookingDTO[]>;
    findByFilter(filterRoomBookingDTO: FilterRoomBookingDTO): Promise<RoomBookingDTO[]>;
    findOne(id: string): Promise<RoomBookingDTO>;
    update(id: string, updateRoomBookingDTO: UpdateRoomBookingDTO): Promise<RoomBookingDTO>;
    remove(id: string): Promise<boolean>;
}
