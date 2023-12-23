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
exports.AuthConfirmDTO = exports.AuthResetPasswordDTO = exports.AuthForgotPasswordDTO = exports.AuthResponseDTO = exports.AuthTokenResponseDTO = exports.AuthDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_dto_1 = require("../user/user.dto");
class AuthDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthDTO.prototype, "password", void 0);
exports.AuthDTO = AuthDTO;
class AuthTokenResponseDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthTokenResponseDTO.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthTokenResponseDTO.prototype, "refresh_token", void 0);
exports.AuthTokenResponseDTO = AuthTokenResponseDTO;
class AuthResponseDTO extends AuthTokenResponseDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_dto_1.UserDTO }),
    __metadata("design:type", user_dto_1.UserDTO)
], AuthResponseDTO.prototype, "user", void 0);
exports.AuthResponseDTO = AuthResponseDTO;
class AuthForgotPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthForgotPasswordDTO.prototype, "email", void 0);
exports.AuthForgotPasswordDTO = AuthForgotPasswordDTO;
class AuthResetPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthResetPasswordDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthResetPasswordDTO.prototype, "password", void 0);
exports.AuthResetPasswordDTO = AuthResetPasswordDTO;
class AuthConfirmDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthConfirmDTO.prototype, "userId", void 0);
exports.AuthConfirmDTO = AuthConfirmDTO;
//# sourceMappingURL=auth.dto.js.map