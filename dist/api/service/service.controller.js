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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const service_dto_1 = require("./service.dto");
const service_service_1 = require("./service.service");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async create(createServiceDTO) {
        return this.serviceService.create(createServiceDTO);
    }
    async findAll() {
        return this.serviceService.findAll();
    }
    async search(filterServiceDTO) {
        return this.serviceService.findByFilter(filterServiceDTO);
    }
    findOne(id) {
        return this.serviceService.findOne(id);
    }
    async update(id, updateServiceDTO) {
        return this.serviceService.update(id, updateServiceDTO);
    }
    async remove(id) {
        return this.serviceService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: service_dto_1.ServiceDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.CreateServiceDTO]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [service_dto_1.ServiceDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [service_dto_1.ServiceDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.FilterServiceDTO]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "search", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: service_dto_1.ServiceDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: service_dto_1.ServiceDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, service_dto_1.UpdateServiceDTO]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "remove", null);
ServiceController = __decorate([
    (0, swagger_1.ApiTags)('service'),
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map