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
exports.HallController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const hall_dto_1 = require("./hall.dto");
const hall_service_1 = require("./hall.service");
let HallController = class HallController {
    constructor(serviceHall) {
        this.serviceHall = serviceHall;
    }
    async create(createHallDTO) {
        return this.serviceHall.create(createHallDTO);
    }
    async findAll() {
        return this.serviceHall.findAll();
    }
    async search(filterHallDTO) {
        return this.serviceHall.findByFilter(filterHallDTO);
    }
    findOne(id) {
        return this.serviceHall.findOne(id);
    }
    async update(id, updateHallDTO) {
        return this.serviceHall.update(id, updateHallDTO);
    }
    async remove(id) {
        return this.serviceHall.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: hall_dto_1.HallDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hall_dto_1.CreateHallDTO]),
    __metadata("design:returntype", Promise)
], HallController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [hall_dto_1.HallDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HallController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [hall_dto_1.HallDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hall_dto_1.FilterHallDTO]),
    __metadata("design:returntype", Promise)
], HallController.prototype, "search", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: hall_dto_1.HallDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HallController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: hall_dto_1.HallDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hall_dto_1.UpdateHallDTO]),
    __metadata("design:returntype", Promise)
], HallController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HallController.prototype, "remove", null);
HallController = __decorate([
    (0, swagger_1.ApiTags)('hall'),
    (0, common_1.Controller)('hall'),
    __metadata("design:paramtypes", [hall_service_1.HallService])
], HallController);
exports.HallController = HallController;
//# sourceMappingURL=hall.controller.js.map