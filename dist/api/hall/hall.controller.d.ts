import { CreateHallDTO, FilterHallDTO, HallDTO, UpdateHallDTO } from './hall.dto';
import { HallService } from './hall.service';
export declare class HallController {
    private readonly serviceHall;
    constructor(serviceHall: HallService);
    create(createHallDTO: CreateHallDTO): Promise<HallDTO>;
    findAll(): Promise<HallDTO[]>;
    search(filterHallDTO: FilterHallDTO): Promise<HallDTO[]>;
    findOne(id: string): Promise<HallDTO>;
    update(id: string, updateHallDTO: UpdateHallDTO): Promise<HallDTO>;
    remove(id: string): Promise<boolean>;
}
