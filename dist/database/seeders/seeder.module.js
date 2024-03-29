"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../../api/user/user.module");
const seeder_1 = require("./seeder");
let SeederModule = class SeederModule {
};
SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), user_module_1.UserModule],
        controllers: [],
        providers: [seeder_1.Seeder],
    })
], SeederModule);
exports.SeederModule = SeederModule;
//# sourceMappingURL=seeder.module.js.map