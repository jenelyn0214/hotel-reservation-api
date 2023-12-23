"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomBookingModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const room_booking_controller_1 = require("./room-booking.controller");
const room_booking_service_1 = require("./room-booking.service");
let RoomBookingModule = class RoomBookingModule {
};
RoomBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [room_booking_controller_1.RoomBookingController],
        providers: [room_booking_service_1.RoomBookingService],
        exports: [room_booking_service_1.RoomBookingService],
    })
], RoomBookingModule);
exports.RoomBookingModule = RoomBookingModule;
//# sourceMappingURL=room-booking.module.js.map