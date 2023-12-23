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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMenuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_menu_dto_1 = require("./order-menu.dto");
const order_menu_service_1 = require("./order-menu.service");
let OrderMenuController = class OrderMenuController {
    constructor(roomBookingService) {
        this.roomBookingService = roomBookingService;
    }
    async create(createOrderMenuDTO) {
        return this.roomBookingService.create(createOrderMenuDTO);
    }
    async findAll() {
        return this.roomBookingService.findAll();
    }
    async search(filterOrderMenuDTO) {
        return this.roomBookingService.findByFilter(filterOrderMenuDTO);
    }
    findOne(id) {
        return this.roomBookingService.findOne(id);
    }
    async update(id, updateOrderMenuDTO) {
        return this.roomBookingService.update(id, updateOrderMenuDTO);
    }
    async remove(id) {
        return this.roomBookingService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: order_menu_dto_1.OrderMenuDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_menu_dto_1.CreateOrderMenuDTO]),
    __metadata("design:returntype", Promise)
], OrderMenuController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [order_menu_dto_1.OrderMenuDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderMenuController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [order_menu_dto_1.OrderMenuDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_menu_dto_1.FilterOrderMenuDTO]),
    __metadata("design:returntype", Promise)
], OrderMenuController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: order_menu_dto_1.FilterOrderMenuDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderMenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: order_menu_dto_1.OrderMenuDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_menu_dto_1.UpdateOrderMenuDTO]),
    __metadata("design:returntype", Promise)
], OrderMenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderMenuController.prototype, "remove", null);
OrderMenuController = __decorate([
    (0, swagger_1.ApiTags)('order menu'),
    (0, common_1.Controller)('order-menu'),
    __metadata("design:paramtypes", [order_menu_service_1.OrderMenuService])
], OrderMenuController);
exports.OrderMenuController = OrderMenuController;
//# sourceMappingURL=order-menu.controller.js.map