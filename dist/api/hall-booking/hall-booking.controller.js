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
exports.HallBookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hall_booking_dto_1 = require("./hall-booking.dto");
const hall_booking_service_1 = require("./hall-booking.service");
let HallBookingController = class HallBookingController {
    constructor(hallBookingService) {
        this.hallBookingService = hallBookingService;
    }
    async create(createHallBookingDTO) {
        return this.hallBookingService.create(createHallBookingDTO);
    }
    async findAll() {
        return this.hallBookingService.findAll();
    }
    async search(filterHallBookingDTO) {
        return this.hallBookingService.findByFilter(filterHallBookingDTO);
    }
    findOne(id) {
        return this.hallBookingService.findOne(id);
    }
    async update(id, updateHallBookingDTO) {
        return this.hallBookingService.update(id, updateHallBookingDTO);
    }
    async remove(id) {
        return this.hallBookingService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: hall_booking_dto_1.HallBookingDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hall_booking_dto_1.CreateHallBookingDTO]),
    __metadata("design:returntype", Promise)
], HallBookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [hall_booking_dto_1.HallBookingDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HallBookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [hall_booking_dto_1.HallBookingDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hall_booking_dto_1.FilterHallBookingDTO]),
    __metadata("design:returntype", Promise)
], HallBookingController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: hall_booking_dto_1.FilterHallBookingDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HallBookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: hall_booking_dto_1.HallBookingDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hall_booking_dto_1.UpdateHallBookingDTO]),
    __metadata("design:returntype", Promise)
], HallBookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HallBookingController.prototype, "remove", null);
HallBookingController = __decorate([
    (0, swagger_1.ApiTags)('hall booking'),
    (0, common_1.Controller)('hall-booking'),
    __metadata("design:paramtypes", [hall_booking_service_1.HallBookingService])
], HallBookingController);
exports.HallBookingController = HallBookingController;
//# sourceMappingURL=hall-booking.controller.js.map