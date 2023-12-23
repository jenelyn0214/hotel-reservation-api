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
exports.HallBookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const database_service_1 = require("../../database/database.service");
const hall_booking_schema_1 = require("../../schema/hall-booking.schema");
let HallBookingService = class HallBookingService {
    constructor(dbService) {
        var _a;
        this.dbService = dbService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.HallBooking) ||
                (0, mongoose_1.model)('HallBooking', hall_booking_schema_1.HallBookingSchema);
    }
    async create(createHallBookingDTO) {
        const hallBooking = await this.serviceModel.create(createHallBookingDTO);
        return hallBooking.toJSON();
    }
    async findAll() {
        const hallBookingsResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const hallBookings = hallBookingsResult.map((u) => u.toJSON());
        return hallBookings;
    }
    async findByFilter(filterHallBookingDTO) {
        const hallBookingsResult = await this.serviceModel
            .find(Object.assign(Object.assign({}, filterHallBookingDTO), { deleted: null }))
            .exec();
        const hallBookings = hallBookingsResult.map((u) => u.toJSON());
        return hallBookings;
    }
    async findOne(id) {
        const hallBookingResult = await this.serviceModel
            .findOne({ _id: id })
            .exec();
        const hallBooking = hallBookingResult.toJSON();
        return hallBooking;
    }
    async update(id, updateHallBookingDTO) {
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, updateHallBookingDTO), { updated: Date.now() }))
            .exec();
        const hallBooking = await this.findOne(id);
        return hallBooking;
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
HallBookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], HallBookingService);
exports.HallBookingService = HallBookingService;
//# sourceMappingURL=hall-booking.service.js.map