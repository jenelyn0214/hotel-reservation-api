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
exports.FilterServiceDTO = exports.UpdateServiceDTO = exports.CreateServiceDTO = exports.ServiceRequestDTO = exports.ServiceDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../enums");
class ServiceDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], ServiceDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], ServiceDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], ServiceDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.ServiceTypeEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.ServiceTypeEnum),
    __metadata("design:type", String)
], ServiceDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServiceDTO.prototype, "price", void 0);
exports.ServiceDTO = ServiceDTO;
class ServiceRequestDTO extends (0, swagger_1.OmitType)(ServiceDTO, [
    'id',
    'created',
    'updated',
    'deleted',
]) {
}
exports.ServiceRequestDTO = ServiceRequestDTO;
class CreateServiceDTO extends ServiceRequestDTO {
}
exports.CreateServiceDTO = CreateServiceDTO;
class UpdateServiceDTO extends (0, swagger_1.PartialType)(ServiceRequestDTO) {
}
exports.UpdateServiceDTO = UpdateServiceDTO;
class FilterServiceDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(ServiceDTO, [
    'id',
    'type',
    'created',
    'updated',
    'deleted',
])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, enum: enums_1.ServiceTypeEnum, type: enums_1.ServiceTypeEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], FilterServiceDTO.prototype, "type", void 0);
exports.FilterServiceDTO = FilterServiceDTO;
//# sourceMappingURL=service.dto.js.map