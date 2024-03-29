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
exports.RoomBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const room_booking_dto_1 = require("./room-booking.dto");
const room_booking_service_1 = require("./room-booking.service");
let RoomBookingController = class RoomBookingController {
    constructor(roomBookingService) {
        this.roomBookingService = roomBookingService;
    }
    async create(createRoomBookingDTO) {
        return this.roomBookingService.create(createRoomBookingDTO);
    }
    async findAll() {
        return this.roomBookingService.findAll();
    }
    async search(filterRoomBookingDTO) {
        return this.roomBookingService.findByFilter(filterRoomBookingDTO);
    }
    findOne(id) {
        return this.roomBookingService.findOne(id);
    }
    async update(id, updateRoomBookingDTO) {
        return this.roomBookingService.update(id, updateRoomBookingDTO);
    }
    async remove(id) {
        return this.roomBookingService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: room_booking_dto_1.RoomBookingDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_booking_dto_1.CreateRoomBookingDTO]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [room_booking_dto_1.RoomBookingDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [room_booking_dto_1.RoomBookingDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_booking_dto_1.FilterRoomBookingDTO]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: room_booking_dto_1.FilterRoomBookingDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: room_booking_dto_1.RoomBookingDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, room_booking_dto_1.UpdateRoomBookingDTO]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomBookingController.prototype, "remove", null);
RoomBookingController = __decorate([
    (0, swagger_1.ApiTags)('room booking'),
    (0, common_1.Controller)('room-booking'),
    __metadata("design:paramtypes", [room_booking_service_1.RoomBookingService])
], RoomBookingController);
exports.RoomBookingController = RoomBookingController;
//# sourceMappingURL=room-booking.controller.js.map