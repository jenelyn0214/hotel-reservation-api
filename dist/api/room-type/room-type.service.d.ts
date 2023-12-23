import { DatabaseService } from '@src/database/database.service';
import { CreateRoomTypeDTO, FilterRoomTypeDTO, RoomTypeDTO, UpdateRoomTypeDTO } from './room-type.dto';
export declare class RoomTypeService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createRoomTypeDTO: CreateRoomTypeDTO): Promise<RoomTypeDTO>;
    findAll(): Promise<RoomTypeDTO[]>;
    findByFilter(filterRoomTypeDTO: FilterRoomTypeDTO): Promise<RoomTypeDTO[]>;
    findOne(id: string): Promise<RoomTypeDTO>;
    update(id: string, updateRoomTypeDTO: UpdateRoomTypeDTO): Promise<RoomTypeDTO>;
    remove(id: string): Promise<boolean>;
}
