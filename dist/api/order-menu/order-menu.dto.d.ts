import { MenuDTO } from '@src/api/menu/menu.dto';
import { IOrderMenu } from '@src/interfaces';
import { OrderDTO } from '../order/order.dto';
export declare class OrderMenuDTO implements IOrderMenu {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    orderId: string;
    order?: OrderDTO;
    menuId: string;
    menu?: MenuDTO;
    qty: number;
}
declare const OrderMenuRequestDTO_base: import("@nestjs/common").Type<Omit<OrderMenuDTO, "id" | "created" | "updated" | "deleted" | "menu" | "order">>;
export declare class OrderMenuRequestDTO extends OrderMenuRequestDTO_base {
}
export declare class CreateOrderMenuDTO extends OrderMenuRequestDTO {
}
declare const UpdateOrderMenuDTO_base: import("@nestjs/common").Type<Partial<OrderMenuRequestDTO>>;
export declare class UpdateOrderMenuDTO extends UpdateOrderMenuDTO_base {
}
declare const FilterOrderMenuDTO_base: import("@nestjs/common").Type<Partial<Omit<OrderMenuDTO, "id" | "created" | "updated" | "deleted" | "menu" | "order">>>;
export declare class FilterOrderMenuDTO extends FilterOrderMenuDTO_base {
}
export {};
