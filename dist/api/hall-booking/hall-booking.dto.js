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
exports.FilterHallBookingDTO = exports.UpdateHallBookingDTO = exports.CreateHallBookingDTO = exports.HallBookingRequestDTO = exports.HallBookingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const hall_dto_1 = require("../hall/hall.dto");
const enums_1 = require("../../enums");
const customer_dto_1 = require("../customer/customer.dto");
class HallBookingDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], HallBookingDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], HallBookingDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], HallBookingDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], HallBookingDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HallBookingDTO.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: customer_dto_1.CustomerDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", customer_dto_1.CustomerDTO)
], HallBookingDTO.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HallBookingDTO.prototype, "hallId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: hall_dto_1.HallDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", hall_dto_1.HallDTO)
], HallBookingDTO.prototype, "hall", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], HallBookingDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], HallBookingDTO.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HallBookingDTO.prototype, "paxCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HallBookingDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.BookingStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.BookingStatusEnum),
    __metadata("design:type", String)
], HallBookingDTO.prototype, "status", void 0);
exports.HallBookingDTO = HallBookingDTO;
class HallBookingRequestDTO extends (0, swagger_1.OmitType)(HallBookingDTO, [
    'id',
    'customer',
    'hall',
    'created',
    'updated',
    'deleted',
]) {
}
exports.HallBookingRequestDTO = HallBookingRequestDTO;
class CreateHallBookingDTO extends HallBookingRequestDTO {
}
exports.CreateHallBookingDTO = CreateHallBookingDTO;
class UpdateHallBookingDTO extends (0, swagger_1.PartialType)(HallBookingRequestDTO) {
}
exports.UpdateHallBookingDTO = UpdateHallBookingDTO;
class FilterHallBookingDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(HallBookingDTO, [
    'id',
    'customer',
    'hall',
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
], FilterHallBookingDTO.prototype, "status", void 0);
exports.FilterHallBookingDTO = FilterHallBookingDTO;
//# sourceMappingURL=hall-booking.dto.js.map