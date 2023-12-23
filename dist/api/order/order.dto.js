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
exports.FilterOrderDTO = exports.UpdateOrderDTO = exports.CreateOrderDTO = exports.OrderRequestDTO = exports.OrderDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const room_dto_1 = require("../room/room.dto");
const enums_1 = require("../../enums");
const queue_dto_1 = require("../queue/queue.dto");
const room_booking_dto_1 = require("../room-booking/room-booking.dto");
class OrderDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], OrderDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], OrderDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], OrderDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "paxCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "subTotalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "totalQty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "seniorCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.PaymentType,
    }),
    (0, class_validator_1.IsEnum)(enums_1.PaymentType),
    __metadata("design:type", String)
], OrderDTO.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "roomBookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: room_booking_dto_1.RoomBookingDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", room_booking_dto_1.RoomBookingDTO)
], OrderDTO.prototype, "roomBooking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: room_dto_1.RoomDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", room_dto_1.RoomDTO)
], OrderDTO.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderDTO.prototype, "queueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: room_dto_1.RoomDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", queue_dto_1.QueueDTO)
], OrderDTO.prototype, "queue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.OrderStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.OrderStatusEnum),
    __metadata("design:type", String)
], OrderDTO.prototype, "status", void 0);
exports.OrderDTO = OrderDTO;
class OrderRequestDTO extends (0, swagger_1.OmitType)(OrderDTO, [
    'id',
    'roomBooking',
    'room',
    'queue',
    'created',
    'updated',
    'deleted',
]) {
}
exports.OrderRequestDTO = OrderRequestDTO;
class CreateOrderDTO extends OrderRequestDTO {
}
exports.CreateOrderDTO = CreateOrderDTO;
class UpdateOrderDTO extends (0, swagger_1.PartialType)(OrderRequestDTO) {
}
exports.UpdateOrderDTO = UpdateOrderDTO;
class FilterOrderDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(OrderDTO, [
    'id',
    'roomBooking',
    'status',
    'paymentType',
    'queue',
    'room',
    'created',
    'updated',
    'deleted',
])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        enum: enums_1.BookingStatusEnum,
        type: enums_1.BookingStatusEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], FilterOrderDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        enum: enums_1.PaymentType,
        type: enums_1.PaymentType,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], FilterOrderDTO.prototype, "paymentType", void 0);
exports.FilterOrderDTO = FilterOrderDTO;
//# sourceMappingURL=order.dto.js.map