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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const menu_dto_1 = require("./menu.dto");
const menu_service_1 = require("./menu.service");
let MenuController = class MenuController {
    constructor(serviceMenu) {
        this.serviceMenu = serviceMenu;
    }
    async create(createMenuDTO) {
        return this.serviceMenu.create(createMenuDTO);
    }
    async findAll() {
        return this.serviceMenu.findAll();
    }
    async search(filterMenuDTO) {
        return this.serviceMenu.findByFilter(filterMenuDTO);
    }
    findOne(id) {
        return this.serviceMenu.findOne(id);
    }
    async update(id, updateMenuDTO) {
        return this.serviceMenu.update(id, updateMenuDTO);
    }
    async remove(id) {
        return this.serviceMenu.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: menu_dto_1.MenuDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.CreateMenuDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "create", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: [menu_dto_1.MenuDTO],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: [menu_dto_1.MenuDTO],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.FilterMenuDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "search", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: menu_dto_1.MenuDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: menu_dto_1.MenuDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, menu_dto_1.UpdateMenuDTO]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: Boolean,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "remove", null);
MenuController = __decorate([
    (0, swagger_1.ApiTags)('menu'),
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map