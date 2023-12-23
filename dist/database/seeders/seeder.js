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
exports.Seeder = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../api/user/user.service");
const data_1 = require("./data");
let Seeder = class Seeder {
    constructor(userService) {
        this.userService = userService;
    }
    async seed() {
        try {
            await this.userSeeder();
            console.debug('Successfuly completed seeding...');
        }
        catch (error) {
            console.log('error', error);
            console.error('Failed seeding...');
        }
    }
    async userSeeder() {
        return await Promise.all(await data_1.users.map(async (user) => {
            await this.userService.create(user);
        }))
            .then(() => {
            console.debug('Users that were created', data_1.users);
            return Promise.resolve(true);
        })
            .catch((error) => Promise.reject(error));
    }
};
Seeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], Seeder);
exports.Seeder = Seeder;
//# sourceMappingURL=seeder.js.map