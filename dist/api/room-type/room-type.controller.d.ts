import { CreateRoomTypeDTO, FilterRoomTypeDTO, RoomTypeDTO, UpdateRoomTypeDTO } from './room-type.dto';
import { RoomTypeService } from './room-type.service';
export declare class RoomTypeController {
    private readonly serviceRoomType;
    constructor(serviceRoomType: RoomTypeService);
    create(createRoomTypeDTO: CreateRoomTypeDTO): Promise<RoomTypeDTO>;
    findAll(): Promise<RoomTypeDTO[]>;
    search(filterRoomTypeDTO: FilterRoomTypeDTO): Promise<RoomTypeDTO[]>;
    findOne(id: string): Promise<RoomTypeDTO>;
    update(id: string, updateRoomTypeDTO: UpdateRoomTypeDTO): Promise<RoomTypeDTO>;
    remove(id: string): Promise<boolean>;
}
