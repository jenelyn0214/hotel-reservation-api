import { DatabaseService } from '@src/database/database.service';
import { CreateRoomDTO, FilterRoomDTO, RoomDTO, UpdateRoomDTO } from './room.dto';
export declare class RoomService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createRoomDTO: CreateRoomDTO): Promise<RoomDTO>;
    findAll(): Promise<RoomDTO[]>;
    findByFilter(filterRoomDTO: FilterRoomDTO): Promise<RoomDTO[]>;
    findOne(id: string): Promise<RoomDTO>;
    update(id: string, updateRoomDTO: UpdateRoomDTO): Promise<RoomDTO>;
    remove(id: string): Promise<boolean>;
}
