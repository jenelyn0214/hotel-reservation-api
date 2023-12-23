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
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const database_service_1 = require("../../database/database.service");
const queue_schema_1 = require("../../schema/queue.schema");
let QueueService = class QueueService {
    constructor(dbService) {
        var _a;
        this.dbService = dbService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.Service) ||
                (0, mongoose_1.model)('Queue', queue_schema_1.QueueSchema);
    }
    async create(createQueueDTO) {
        const queueType = await this.serviceModel.create(createQueueDTO);
        return queueType.toJSON();
    }
    async findAll() {
        const queueTypesResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const queueTypes = queueTypesResult.map((u) => u.toJSON());
        return queueTypes;
    }
    async findByFilter(filterQueueDTO) {
        const queueTypesResult = await this.serviceModel
            .find(Object.assign(Object.assign({}, filterQueueDTO), { deleted: null }))
            .exec();
        const queueTypes = queueTypesResult.map((u) => u.toJSON());
        return queueTypes;
    }
    async findOne(id) {
        const service = await this.serviceModel.findOne({ _id: id }).exec();
        return service.toJSON();
    }
    async update(id, updateQueueDTO) {
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, updateQueueDTO), { updated: Date.now() }))
            .exec();
        return await this.findOne(id);
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
QueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], QueueService);
exports.QueueService = QueueService;
//# sourceMappingURL=queue.service.js.map