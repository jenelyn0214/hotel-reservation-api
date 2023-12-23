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
exports.BookingServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_dto_1 = require("./booking-service.dto");
const booking_service_service_1 = require("./booking-service.service");
let BookingServiceController = class BookingServiceController {
    constructor(bookingServiceService) {
        this.bookingServiceService = bookingServiceService;
    }
    async create(createBookingServiceDTO) {
        return this.bookingServiceService.create(createBookingServiceDTO);
    }
    async findAll() {
        return this.bookingServiceService.findAll();
    }
    async search(filterBookingServiceDTO) {
        return this.bookingServiceService.findByFilter(filterBookingServiceDTO);
    }
    findOne(id) {
        return this.bookingServiceService.findOne(id);
    }
    async update(id, updateBookingServiceDTO) {
        return this.bookingServiceService.update(id, updateBookingServiceDTO);
    }
    async remove(id) {
        return this.bookingServiceService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: booking_service_dto_1.BookingServiceDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_service_dto_1.CreateBookingServiceDTO]),
    __metadata("design:returntype", Promise)
], BookingServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [booking_service_dto_1.BookingServiceDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [booking_service_dto_1.BookingServiceDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_service_dto_1.FilterBookingServiceDTO]),
    __metadata("design:returntype", Promise)
], BookingServiceController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: booking_service_dto_1.FilterBookingServiceDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: booking_service_dto_1.BookingServiceDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_service_dto_1.UpdateBookingServiceDTO]),
    __metadata("design:returntype", Promise)
], BookingServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingServiceController.prototype, "remove", null);
BookingServiceController = __decorate([
    (0, swagger_1.ApiTags)('booking service'),
    (0, common_1.Controller)('booking-service'),
    __metadata("design:paramtypes", [booking_service_service_1.BookingServiceService])
], BookingServiceController);
exports.BookingServiceController = BookingServiceController;
//# sourceMappingURL=booking-service.controller.js.map