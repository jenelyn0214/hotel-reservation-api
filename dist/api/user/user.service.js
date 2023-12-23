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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const common_config_1 = __importDefault(require("../../config/common.config"));
const database_service_1 = require("../../database/database.service");
const user_schema_1 = require("../../schema/user.schema");
const password_1 = require("../../util/password");
let UserService = class UserService {
    constructor(commonConfig, dbService) {
        var _a;
        this.commonConfig = commonConfig;
        this.dbService = dbService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.User) || (0, mongoose_1.model)('User', user_schema_1.UserSchema);
    }
    async create(createUserDTO) {
        const password = (0, password_1.encryptPassword)(createUserDTO.password);
        const fullName = createUserDTO.firstName +
            ' ' +
            (createUserDTO.middleName ? createUserDTO.middleName[0] + '. ' : '') +
            createUserDTO.lastName;
        const user = await this.serviceModel.create(Object.assign(Object.assign({}, createUserDTO), { password,
            fullName }));
        return user.toJSON();
    }
    async findAll() {
        const usersResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const users = usersResult.map((u) => u.toJSON());
        return users;
    }
    async findByFilter(filterUserDTO) {
        const { createdFrom, createdTo } = filterUserDTO, filters = __rest(filterUserDTO, ["createdFrom", "createdTo"]);
        let filterData = Object.assign(Object.assign({}, filters), { deleted: null });
        if (createdFrom && createdTo) {
            createdTo.setHours(23, 59, 59, 999);
            filterData = Object.assign(Object.assign({}, filterData), { created: { $gte: createdFrom, $lte: createdTo } });
        }
        const usersResult = await this.serviceModel.find(filterData).exec();
        const users = usersResult.map((u) => u.toJSON());
        return users;
    }
    async findOne(id) {
        const user = await this.serviceModel.findOne({ _id: id }).exec();
        return user.toJSON();
    }
    async update(id, updateUserDTO, updateLogin) {
        var _a, _b, _c;
        const user = await this.findOne(id);
        const dataToUpdate = Object.assign(Object.assign({}, updateUserDTO), { updated: Date.now() });
        const firstName = (_a = dataToUpdate.firstName) !== null && _a !== void 0 ? _a : user.firstName;
        const middleName = (_b = dataToUpdate.middleName) !== null && _b !== void 0 ? _b : user.middleName;
        const lastName = (_c = dataToUpdate.lastName) !== null && _c !== void 0 ? _c : user.lastName;
        const fullName = firstName + ' ' + (middleName ? middleName[0] + '. ' : '') + lastName;
        const login = updateLogin ? Date.now() : null;
        const password = updateUserDTO.password
            ? (0, password_1.encryptPassword)(updateUserDTO.password)
            : user.password;
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, dataToUpdate), { fullName,
            login,
            password }))
            .exec();
        return await this.findOne(id);
    }
    async remove(id) {
        const result = await this.serviceModel
            .updateOne({ _id: id }, { deleted: Date.now() })
            .exec()
            .then(() => {
            return true;
        })
            .catch((error) => {
            console.error(error);
            return false;
        });
        return result;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0, database_service_1.DatabaseService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map