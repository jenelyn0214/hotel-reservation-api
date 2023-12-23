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
exports.RoomBookingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const database_service_1 = require("../../database/database.service");
const room_booking_schema_1 = require("../../schema/room-booking.schema");
let RoomBookingService = class RoomBookingService {
    constructor(dbService) {
        var _a;
        this.dbService = dbService;
        this.serviceModel =
            ((_a = this.dbService.db()) === null || _a === void 0 ? void 0 : _a.models.RoomBooking) ||
                (0, mongoose_1.model)('RoomBooking', room_booking_schema_1.RoomBookingSchema);
    }
    async create(createRoomBookingDTO) {
        const roomBooking = await this.serviceModel.create(createRoomBookingDTO);
        return roomBooking.toJSON();
    }
    async findAll() {
        const roomBookingsResult = await this.serviceModel
            .find({
            deleted: null,
        })
            .exec();
        const roomBookings = roomBookingsResult.map((u) => u.toJSON());
        return roomBookings;
    }
    async findByFilter(filterRoomBookingDTO) {
        const roomBookingsResult = await this.serviceModel
            .find(Object.assign(Object.assign({}, filterRoomBookingDTO), { deleted: null }))
            .exec();
        const roomBookings = roomBookingsResult.map((u) => u.toJSON());
        return roomBookings;
    }
    async findOne(id) {
        const roomBookingResult = await this.serviceModel
            .findOne({ _id: id })
            .exec();
        const roomBooking = roomBookingResult.toJSON();
        return roomBooking;
    }
    async update(id, updateRoomBookingDTO) {
        await this.serviceModel
            .updateOne({ _id: id }, Object.assign(Object.assign({}, updateRoomBookingDTO), { updated: Date.now() }))
            .exec();
        const roomBooking = await this.findOne(id);
        return roomBooking;
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
RoomBookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RoomBookingService);
exports.RoomBookingService = RoomBookingService;
//# sourceMappingURL=room-booking.service.js.map