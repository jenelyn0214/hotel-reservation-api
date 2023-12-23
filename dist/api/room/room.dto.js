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
exports.FilterRoomDTO = exports.UpdateRoomDTO = exports.CreateRoomDTO = exports.RoomRequestDTO = exports.RoomDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../enums");
const room_type_dto_1 = require("../room-type/room-type.dto");
class RoomDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], RoomDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoomDTO.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoomDTO.prototype, "roomTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: room_type_dto_1.RoomTypeDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", room_type_dto_1.RoomTypeDTO)
], RoomDTO.prototype, "roomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomDTO.prototype, "maxPax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.RoomStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.RoomStatusEnum),
    __metadata("design:type", String)
], RoomDTO.prototype, "status", void 0);
exports.RoomDTO = RoomDTO;
class RoomRequestDTO extends (0, swagger_1.OmitType)(RoomDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'roomType',
]) {
}
exports.RoomRequestDTO = RoomRequestDTO;
class CreateRoomDTO extends RoomRequestDTO {
}
exports.CreateRoomDTO = CreateRoomDTO;
class UpdateRoomDTO extends (0, swagger_1.PartialType)(RoomRequestDTO) {
}
exports.UpdateRoomDTO = UpdateRoomDTO;
class FilterRoomDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(RoomDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'status',
    'roomType',
])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, enum: enums_1.RoomStatusEnum, type: enums_1.RoomStatusEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], FilterRoomDTO.prototype, "status", void 0);
exports.FilterRoomDTO = FilterRoomDTO;
//# sourceMappingURL=room.dto.js.map