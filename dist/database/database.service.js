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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const database_config_1 = __importDefault(require("../config/database.config"));
let DatabaseService = class DatabaseService {
    constructor(databaseConfig) {
        this.databaseConfig = databaseConfig;
        if (!this.databaseConfig.databaseURI) {
            throw new Error('Please define the MONGODB_URI environment variable inside .env');
        }
        this.connect();
    }
    async connect() {
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default
            .connect(this.databaseConfig.databaseURI)
            .catch((err) => {
            throw new Error(`Initial Distribution API Database connection error occured -` + err);
        })
            .then((result) => {
            this.dbInstance = result;
            console.log('Database connection Succeeded');
        });
        mongoose_1.default.set('debug', true);
    }
    db() {
        if (this.dbInstance)
            return this.dbInstance;
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map