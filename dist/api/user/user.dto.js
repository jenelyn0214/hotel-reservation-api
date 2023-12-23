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
exports.FilterUserDTO = exports.UpdateUserDTO = exports.CreateUserDTO = exports.UserRequestDTO = exports.UserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../enums");
class UserDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserDTO.prototype, "created", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserDTO.prototype, "updated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], UserDTO.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDTO.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserDTO.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.UserTypeEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.UserTypeEnum),
    __metadata("design:type", String)
], UserDTO.prototype, "type", void 0);
exports.UserDTO = UserDTO;
class UserRequestDTO extends (0, swagger_1.OmitType)(UserDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'fullName',
]) {
}
exports.UserRequestDTO = UserRequestDTO;
class CreateUserDTO extends UserRequestDTO {
}
exports.CreateUserDTO = CreateUserDTO;
class UpdateUserDTO extends (0, swagger_1.PartialType)(UserRequestDTO) {
}
exports.UpdateUserDTO = UpdateUserDTO;
class FilterUserDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(UserDTO, [
    'id',
    'created',
    'updated',
    'deleted',
    'refreshToken',
    'type',
    'password',
])) {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, enum: enums_1.UserTypeEnum, type: enums_1.UserTypeEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], FilterUserDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterUserDTO.prototype, "createdFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value && new Date(value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], FilterUserDTO.prototype, "createdTo", void 0);
exports.FilterUserDTO = FilterUserDTO;
//# sourceMappingURL=user.dto.js.map