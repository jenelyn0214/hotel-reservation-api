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
exports.BookingServiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const database_service_1 = require("../../database/database.service");
const booking_service_schema_1 = require("../../schema/booking-service.schema");
let BookingServiceService = class BookingServiceService {
    constructor(dbService) {
        var _a;
        this.dbService = dbService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.BookingService) ||
                (0, mongoose_1.model)('BookingService', booking_service_schema_1.BookingServiceSchema);
    }
    async create(createBookingServiceDTO) {
        const bookingService = await this.serviceModel.create(createBookingServiceDTO);
        return bookingService.toJSON();
    }
    async findAll() {
        const bookingServicesResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const bookingServices = bookingServicesResult.map((u) => u.toJSON());
        return bookingServices;
    }
    async findByFilter(filterBookingServiceDTO) {
        const bookingServicesResult = await this.serviceModel
            .find(Object.assign(Object.assign({}, filterBookingServiceDTO), { deleted: null }))
            .exec();
        const bookingServices = bookingServicesResult.map((u) => u.toJSON());
        return bookingServices;
    }
    async findOne(id) {
        const bookingServiceResult = await this.serviceModel
            .findOne({ _id: id })
            .exec();
        const bookingService = bookingServiceResult.toJSON();
        return bookingService;
    }
    async update(id, updateBookingServiceDTO) {
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, updateBookingServiceDTO), { updated: Date.now() }))
            .exec();
        const bookingService = await this.findOne(id);
        return bookingService;
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
BookingServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], BookingServiceService);
exports.BookingServiceService = BookingServiceService;
//# sourceMappingURL=booking-service.service.js.map