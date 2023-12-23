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
exports.FilterRoomTypeDTO = exports.UpdateRoomTypeDTO = exports.CreateRoomTypeDTO = exports.RoomTypeRequestDTO = exports.RoomTypeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RoomTypeDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], RoomTypeDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomTypeDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomTypeDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], RoomTypeDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoomTypeDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomTypeDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomTypeDTO.prototype, "maxPax", void 0);
exports.RoomTypeDTO = RoomTypeDTO;
class RoomTypeRequestDTO extends (0, swagger_1.OmitType)(RoomTypeDTO, [
    'id',
    'created',
    'updated',
    'deleted',
]) {
}
exports.RoomTypeRequestDTO = RoomTypeRequestDTO;
class CreateRoomTypeDTO extends RoomTypeRequestDTO {
}
exports.CreateRoomTypeDTO = CreateRoomTypeDTO;
class UpdateRoomTypeDTO extends (0, swagger_1.PartialType)(RoomTypeRequestDTO) {
}
exports.UpdateRoomTypeDTO = UpdateRoomTypeDTO;
class FilterRoomTypeDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(RoomTypeDTO, ['id', 'created', 'updated', 'deleted'])) {
}
exports.FilterRoomTypeDTO = FilterRoomTypeDTO;
//# sourceMappingURL=room-type.dto.js.map