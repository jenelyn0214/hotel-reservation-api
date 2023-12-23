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
exports.QueueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const queue_dto_1 = require("./queue.dto");
const queue_service_1 = require("./queue.service");
let QueueController = class QueueController {
    constructor(serviceQueue) {
        this.serviceQueue = serviceQueue;
    }
    async create(createQueueDTO) {
        return this.serviceQueue.create(createQueueDTO);
    }
    async findAll() {
        return this.serviceQueue.findAll();
    }
    async search(filterQueueDTO) {
        return this.serviceQueue.findByFilter(filterQueueDTO);
    }
    findOne(id) {
        return this.serviceQueue.findOne(id);
    }
    async update(id, updateQueueDTO) {
        return this.serviceQueue.update(id, updateQueueDTO);
    }
    async remove(id) {
        return this.serviceQueue.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: queue_dto_1.QueueDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queue_dto_1.CreateQueueDTO]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [queue_dto_1.QueueDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [queue_dto_1.QueueDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queue_dto_1.FilterQueueDTO]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "search", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: queue_dto_1.QueueDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: queue_dto_1.QueueDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, queue_dto_1.UpdateQueueDTO]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "remove", null);
QueueController = __decorate([
    (0, swagger_1.ApiTags)('queue'),
    (0, common_1.Controller)('queue'),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueController);
exports.QueueController = QueueController;
//# sourceMappingURL=queue.controller.js.map