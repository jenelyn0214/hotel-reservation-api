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
exports.RoomTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const room_type_dto_1 = require("./room-type.dto");
const room_type_service_1 = require("./room-type.service");
let RoomTypeController = class RoomTypeController {
    constructor(serviceRoomType) {
        this.serviceRoomType = serviceRoomType;
    }
    async create(createRoomTypeDTO) {
        return this.serviceRoomType.create(createRoomTypeDTO);
    }
    async findAll() {
        return this.serviceRoomType.findAll();
    }
    async search(filterRoomTypeDTO) {
        return this.serviceRoomType.findByFilter(filterRoomTypeDTO);
    }
    findOne(id) {
        return this.serviceRoomType.findOne(id);
    }
    async update(id, updateRoomTypeDTO) {
        return this.serviceRoomType.update(id, updateRoomTypeDTO);
    }
    async remove(id) {
        return this.serviceRoomType.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: room_type_dto_1.RoomTypeDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_type_dto_1.CreateRoomTypeDTO]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [room_type_dto_1.RoomTypeDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [room_type_dto_1.RoomTypeDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_type_dto_1.FilterRoomTypeDTO]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "search", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: room_type_dto_1.RoomTypeDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: room_type_dto_1.RoomTypeDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, room_type_dto_1.UpdateRoomTypeDTO]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "remove", null);
RoomTypeController = __decorate([
    (0, swagger_1.ApiTags)('room type'),
    (0, common_1.Controller)('room-type'),
    __metadata("design:paramtypes", [room_type_service_1.RoomTypeService])
], RoomTypeController);
exports.RoomTypeController = RoomTypeController;
//# sourceMappingURL=room-type.controller.js.map