import { CreateRoomBookingDTO, FilterRoomBookingDTO, RoomBookingDTO, UpdateRoomBookingDTO } from './room-booking.dto';
import { RoomBookingService } from './room-booking.service';
export declare class RoomBookingController {
    private readonly roomBookingService;
    constructor(roomBookingService: RoomBookingService);
    create(createRoomBookingDTO: CreateRoomBookingDTO): Promise<RoomBookingDTO>;
    findAll(): Promise<RoomBookingDTO[]>;
    search(filterRoomBookingDTO: FilterRoomBookingDTO): Promise<RoomBookingDTO[]>;
    findOne(id: string): Promise<RoomBookingDTO>;
    update(id: string, updateRoomBookingDTO: UpdateRoomBookingDTO): Promise<RoomBookingDTO>;
    remove(id: string): Promise<boolean>;
}
