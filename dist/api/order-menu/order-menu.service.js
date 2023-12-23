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
exports.OrderMenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const database_service_1 = require("../../database/database.service");
const order_menu_schema_1 = require("../../schema/order-menu.schema");
let OrderMenuService = class OrderMenuService {
    constructor(dbService) {
        var _a;
        this.dbService = dbService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.OrderMenu) ||
                (0, mongoose_1.model)('OrderMenu', order_menu_schema_1.OrderMenuSchema);
    }
    async create(createOrderMenuDTO) {
        const roomBooking = await this.serviceModel.create(createOrderMenuDTO);
        return roomBooking.toJSON();
    }
    async findAll() {
        const roomBookingsResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const roomBookings = roomBookingsResult.map((u) => u.toJSON());
        return roomBookings;
    }
    async findByFilter(filterOrderMenuDTO) {
        const roomBookingsResult = await this.serviceModel
            .find(Object.assign(Object.assign({}, filterOrderMenuDTO), { deleted: null }))
            .exec();
        const roomBookings = roomBookingsResult.map((u) => u.toJSON());
        return roomBookings;
    }
    async findOne(id) {
        const roomBookingResult = await this.serviceModel
            .findOne({ _id: id })
            .exec();
        const roomBooking = roomBookingResult.toJSON();
        return roomBooking;
    }
    async update(id, updateOrderMenuDTO) {
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, updateOrderMenuDTO), { updated: Date.now() }))
            .exec();
        const roomBooking = await this.findOne(id);
        return roomBooking;
    }
    async remove(id) {
        const result = await this.serviceModel
            .updateOne({ _id: id }, { deleted: Date.now() })
            .exec()
            .then(() => {
            return true;
        })
            .catch((error) => {
            console.error(error);
            return false;
        });
        return result;
    }
};
OrderMenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrderMenuService);
exports.OrderMenuService = OrderMenuService;
//# sourceMappingURL=order-menu.service.js.map