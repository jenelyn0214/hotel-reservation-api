import { QueueStatusEnum } from '@src/enums';
import { IQueue } from '@src/interfaces';
export declare class QueueDTO implements IQueue {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    number: string;
    status: QueueStatusEnum;
}
declare const QueueRequestDTO_base: import("@nestjs/common").Type<Omit<QueueDTO, "id" | "created" | "updated" | "deleted">>;
export declare class QueueRequestDTO extends QueueRequestDTO_base {
}
export declare class CreateQueueDTO extends QueueRequestDTO {
}
declare const UpdateQueueDTO_base: import("@nestjs/common").Type<Partial<QueueRequestDTO>>;
export declare class UpdateQueueDTO extends UpdateQueueDTO_base {
}
declare const FilterQueueDTO_base: import("@nestjs/common").Type<Partial<Omit<QueueDTO, "id" | "created" | "updated" | "deleted" | "status">>>;
export declare class FilterQueueDTO extends FilterQueueDTO_base {
    status?: QueueStatusEnum[];
}
export {};
