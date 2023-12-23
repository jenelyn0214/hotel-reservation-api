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
exports.FilterBookingServiceDTO = exports.UpdateBookingServiceDTO = exports.CreateBookingServiceDTO = exports.BookingServiceRequestDTO = exports.BookingServiceDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const room_booking_dto_1 = require("../room-booking/room-booking.dto");
const service_dto_1 = require("../service/service.dto");
class BookingServiceDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], BookingServiceDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], BookingServiceDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], BookingServiceDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], BookingServiceDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookingServiceDTO.prototype, "roomBookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: room_booking_dto_1.RoomBookingDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", room_booking_dto_1.RoomBookingDTO)
], BookingServiceDTO.prototype, "roomBooking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookingServiceDTO.prototype, "serviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: service_dto_1.ServiceDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", service_dto_1.ServiceDTO)
], BookingServiceDTO.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookingServiceDTO.prototype, "qty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BookingServiceDTO.prototype, "price", void 0);
exports.BookingServiceDTO = BookingServiceDTO;
class BookingServiceRequestDTO extends (0, swagger_1.OmitType)(BookingServiceDTO, [
    'id',
    'service',
    'roomBooking',
    'created',
    'updated',
    'deleted',
]) {
}
exports.BookingServiceRequestDTO = BookingServiceRequestDTO;
class CreateBookingServiceDTO extends BookingServiceRequestDTO {
}
exports.CreateBookingServiceDTO = CreateBookingServiceDTO;
class UpdateBookingServiceDTO extends (0, swagger_1.PartialType)(BookingServiceRequestDTO) {
}
exports.UpdateBookingServiceDTO = UpdateBookingServiceDTO;
class FilterBookingServiceDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(BookingServiceDTO, [
    'id',
    'service',
    'roomBooking',
    'created',
    'updated',
    'deleted',
])) {
}
exports.FilterBookingServiceDTO = FilterBookingServiceDTO;
//# sourceMappingURL=booking-service.dto.js.map