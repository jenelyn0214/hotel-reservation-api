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
exports.FilterRoomBookingDTO = exports.UpdateRoomBookingDTO = exports.CreateRoomBookingDTO = exports.RoomBookingRequestDTO = exports.RoomBookingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const room_dto_1 = require("../room/room.dto");
const enums_1 = require("../../enums");
const customer_dto_1 = require("../customer/customer.dto");
class RoomBookingDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], RoomBookingDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomBookingDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomBookingDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomBookingDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoomBookingDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: customer_dto_1.CustomerDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", customer_dto_1.CustomerDTO)
], RoomBookingDTO.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoomBookingDTO.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: room_dto_1.RoomDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", room_dto_1.RoomDTO)
], RoomBookingDTO.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RoomBookingDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RoomBookingDTO.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "paxCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "adultCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "childCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "seniorCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "subTotalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "discountAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomBookingDTO.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.BookingStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.BookingStatusEnum),
    __metadata("design:type", String)
], RoomBookingDTO.prototype, "status", void 0);
exports.RoomBookingDTO = RoomBookingDTO;
class RoomBookingRequestDTO extends (0, swagger_1.OmitType)(RoomBookingDTO, [
    'id',
    'customer',
    'room',
    'created',
    'updated',
    'deleted',
]) {
}
exports.RoomBookingRequestDTO = RoomBookingRequestDTO;
class CreateRoomBookingDTO extends RoomBookingRequestDTO {
}
exports.CreateRoomBookingDTO = CreateRoomBookingDTO;
class UpdateRoomBookingDTO extends (0, swagger_1.PartialType)(RoomBookingRequestDTO) {
}
exports.UpdateRoomBookingDTO = UpdateRoomBookingDTO;
class FilterRoomBookingDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(RoomBookingDTO, [
    'id',
    'customer',
    'room',
    'created',
    'updated',
    'deleted',
    'status',
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
], FilterRoomBookingDTO.prototype, "status", void 0);
exports.FilterRoomBookingDTO = FilterRoomBookingDTO;
//# sourceMappingURL=room-booking.dto.js.map