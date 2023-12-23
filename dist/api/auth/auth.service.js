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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const common_config_1 = __importDefault(require("../../config/common.config"));
const password_1 = require("../../util/password");
let AuthService = class AuthService {
    constructor(jwtService, commonConfig, userService) {
        this.jwtService = jwtService;
        this.commonConfig = commonConfig;
        this.userService = userService;
    }
    async login(authDTO) {
        const users = await this.userService.findByFilter({
            email: authDTO.email,
        });
        if (users.length === 0)
            throw new common_1.ForbiddenException('Access Denied');
        const user = users[0];
        const passwordMatches = (0, password_1.comparePassword)(authDTO.password, user.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.userService.update(user.id, {
            refreshToken: tokens.refresh_token,
        }, true);
        return Object.assign(Object.assign({}, tokens), { user });
    }
    async logout(userId) {
        await this.userService.update(userId, {
            refreshToken: null,
        });
        return true;
    }
    async refreshTokens(userId, rt) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied no data');
        const rtMatches = user.refreshToken === rt;
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied from rt');
        const tokens = await this.getTokens(user.id, user.email);
        await this.userService.update(user.id, {
            refreshToken: tokens.refresh_token,
        });
        return tokens;
    }
    async getTokens(userId, email) {
        const jwtPayload = {
            sub: userId,
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.commonConfig.jwt.accessTokenSecret,
                expiresIn: '1d',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.commonConfig.jwt.refreshTokenSecret,
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async forgotPassword(authForgotPasswordDTO) {
        const users = await this.userService.findByFilter({
            email: authForgotPasswordDTO.email,
        });
        if (!users)
            throw new common_1.ForbiddenException("Email doesn't exist!");
        return true;
    }
    async confirm(authConfirmDTO) {
        const user = await this.userService.findOne(authConfirmDTO.userId);
        if (!user)
            throw new common_1.ForbiddenException('Access Denied');
        await this.userService.update(user.id, {});
        return true;
    }
    async resetPassword(authResetPasswordDTO) {
        const user = await this.userService.findOne(authResetPasswordDTO.userId);
        if (!user)
            throw new common_1.ForbiddenException('Access Denied');
        await this.userService.update(user.id, {
            password: authResetPasswordDTO.password,
        });
        return true;
    }
    async getCurrentUser(userId) {
        const user = await this.userService.findOne(userId);
        if (!user)
            throw new common_1.ForbiddenException('Access Denied');
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_config_1.default.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService, void 0, user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map