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
exports.AtGuard = exports.blackList = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const common_config_1 = __importDefault(require("../../config/common.config"));
const api_hasher_1 = require("../../util/api-hasher");
exports.blackList = [];
let AtGuard = class AtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, commonConfig) {
        super();
        this.reflector = reflector;
        this.commonConfig = commonConfig;
    }
    canActivate(context) {
        var _a, _b;
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const apiKey = request === null || request === void 0 ? void 0 : request.headers['x-api-key'];
        const apiHash = request === null || request === void 0 ? void 0 : request.headers['x-api-hash'];
        const checkApiKey = (0, api_hasher_1.validateAPIHash)({
            apiKey: this.commonConfig.apiKey,
            data: (request === null || request === void 0 ? void 0 : request.body) || {},
            params: (request === null || request === void 0 ? void 0 : request.query) || {},
        }, apiHash);
        if (!apiKey)
            return false;
        if (apiKey !== this.commonConfig.apiKey)
            return false;
        if (this.commonConfig.secured === 'true') {
            if (!checkApiKey)
                return false;
        }
        if (isPublic)
            return true;
        const accessToken = (_b = (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
        if (exports.blackList.includes(accessToken)) {
            console.log('blocked - ', accessToken);
            return false;
        }
        if (request.route.path.includes('auth/logout')) {
            exports.blackList.push(accessToken);
        }
        return super.canActivate(context);
    }
};
AtGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_config_1.default.KEY)),
    __metadata("design:paramtypes", [core_1.Reflector, void 0])
], AtGuard);
exports.AtGuard = AtGuard;
//# sourceMappingURL=at.guard.js.map