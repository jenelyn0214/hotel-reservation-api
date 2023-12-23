import { DatabaseService } from '@src/database/database.service';
import { CreateHallDTO, FilterHallDTO, HallDTO, UpdateHallDTO } from './hall.dto';
export declare class HallService {
    private readonly dbService;
    private serviceModel;
    constructor(dbService: DatabaseService);
    create(createHallDTO: CreateHallDTO): Promise<HallDTO>;
    findAll(): Promise<HallDTO[]>;
    findByFilter(filterHallDTO: FilterHallDTO): Promise<HallDTO[]>;
    findOne(id: string): Promise<HallDTO>;
    update(id: string, updateHallDTO: UpdateHallDTO): Promise<HallDTO>;
    remove(id: string): Promise<boolean>;
}
