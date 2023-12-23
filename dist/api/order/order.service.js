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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const queue_service_1 = require("../queue/queue.service");
const database_service_1 = require("../../database/database.service");
const enums_1 = require("../../enums");
const order_schema_1 = require("../../schema/order.schema");
let OrderService = class OrderService {
    constructor(dbService, queueService) {
        var _a;
        this.dbService = dbService;
        this.queueService = queueService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.Order) ||
                (0, mongoose_1.model)('Order', order_schema_1.OrderSchema);
    }
    async create(createOrderDTO) {
        const order = await this.serviceModel.create(createOrderDTO);
        const data = order.toJSON();
        if (data.queueId) {
            await this.queueService.update(data.queueId, {
                status: enums_1.QueueStatusEnum.USED,
            });
        }
        return data;
    }
    async findAll() {
        const ordersResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const orders = ordersResult.map((u) => u.toJSON());
        return orders;
    }
    async findByFilter(filterOrderDTO) {
        const ordersResult = await this.serviceModel
            .find(Object.assign(Object.assign({}, filterOrderDTO), { deleted: null }))
            .exec();
        const orders = ordersResult.map((u) => u.toJSON());
        return orders;
    }
    async findOne(id) {
        const orderResult = await this.serviceModel.findOne({ _id: id }).exec();
        const order = orderResult.toJSON();
        return order;
    }
    async update(id, updateOrderDTO) {
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, updateOrderDTO), { updated: Date.now() }))
            .exec();
        const order = await this.findOne(id);
        if (updateOrderDTO.status &&
            updateOrderDTO.status === enums_1.OrderStatusEnum.DONE) {
            await this.queueService.update(order.queueId, {
                status: enums_1.QueueStatusEnum.AVAILABLE,
            });
        }
        const updatedOrder = await this.findOne(id);
        return updatedOrder;
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
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        queue_service_1.QueueService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map