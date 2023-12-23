import { CreateRoomDTO, FilterRoomDTO, RoomDTO, UpdateRoomDTO } from './room.dto';
import { RoomService } from './room.service';
export declare class RoomController {
    private readonly serviceRoom;
    constructor(serviceRoom: RoomService);
    create(createRoomDTO: CreateRoomDTO): Promise<RoomDTO>;
    findAll(): Promise<RoomDTO[]>;
    search(filterRoomDTO: FilterRoomDTO): Promise<RoomDTO[]>;
    findOne(id: string): Promise<RoomDTO>;
    update(id: string, updateRoomDTO: UpdateRoomDTO): Promise<RoomDTO>;
    remove(id: string): Promise<boolean>;
}
