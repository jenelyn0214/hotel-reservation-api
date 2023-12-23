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
exports.FilterMenuDTO = exports.UpdateMenuDTO = exports.CreateMenuDTO = exports.MenuRequestDTO = exports.MenuDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../enums");
class MenuDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MenuDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], MenuDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], MenuDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], MenuDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MenuDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.MenuStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.MenuStatusEnum),
    __metadata("design:type", String)
], MenuDTO.prototype, "status", void 0);
exports.MenuDTO = MenuDTO;
class MenuRequestDTO extends (0, swagger_1.OmitType)(MenuDTO, [
    'id',
    'created',
    'updated',
    'deleted',
]) {
}
exports.MenuRequestDTO = MenuRequestDTO;
class CreateMenuDTO extends MenuRequestDTO {
}
exports.CreateMenuDTO = CreateMenuDTO;
class UpdateMenuDTO extends (0, swagger_1.PartialType)(MenuRequestDTO) {
}
exports.UpdateMenuDTO = UpdateMenuDTO;
class FilterMenuDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(MenuDTO, ['id', 'created', 'updated', 'deleted', 'status'])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, enum: enums_1.MenuStatusEnum, type: enums_1.MenuStatusEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], FilterMenuDTO.prototype, "status", void 0);
exports.FilterMenuDTO = FilterMenuDTO;
//# sourceMappingURL=menu.dto.js.map