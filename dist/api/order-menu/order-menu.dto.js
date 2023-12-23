"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOrderMenuDTO = exports.UpdateOrderMenuDTO = exports.CreateOrderMenuDTO = exports.OrderMenuRequestDTO = exports.OrderMenuDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const menu_dto_1 = require("../menu/menu.dto");
const order_dto_1 = require("../order/order.dto");
class OrderMenuDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], OrderMenuDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], OrderMenuDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], OrderMenuDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], OrderMenuDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderMenuDTO.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: order_dto_1.OrderDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", order_dto_1.OrderDTO)
], OrderMenuDTO.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderMenuDTO.prototype, "menuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: menu_dto_1.MenuDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", menu_dto_1.MenuDTO)
], OrderMenuDTO.prototype, "menu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderMenuDTO.prototype, "qty", void 0);
exports.OrderMenuDTO = OrderMenuDTO;
class OrderMenuRequestDTO extends (0, swagger_1.OmitType)(OrderMenuDTO, [
    'id',
    'order',
    'menu',
    'created',
    'updated',
    'deleted',
]) {
}
exports.OrderMenuRequestDTO = OrderMenuRequestDTO;
class CreateOrderMenuDTO extends OrderMenuRequestDTO {
}
exports.CreateOrderMenuDTO = CreateOrderMenuDTO;
class UpdateOrderMenuDTO extends (0, swagger_1.PartialType)(OrderMenuRequestDTO) {
}
exports.UpdateOrderMenuDTO = UpdateOrderMenuDTO;
class FilterOrderMenuDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(OrderMenuDTO, [
    'id',
    'order',
    'menu',
    'created',
    'updated',
    'deleted',
])) {
}
exports.FilterOrderMenuDTO = FilterOrderMenuDTO;
//# sourceMappingURL=order-menu.dto.js.map