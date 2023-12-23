"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServiceModule = void 0;
const common_1 = require("@nestjs/common");
const room_module_1 = require("../room/room.module");
const database_module_1 = require("../../database/database.module");
const booking_service_controller_1 = require("./booking-service.controller");
const booking_service_service_1 = require("./booking-service.service");
let BookingServiceModule = class BookingServiceModule {
};
BookingServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, room_module_1.RoomModule],
        controllers: [booking_service_controller_1.BookingServiceController],
        providers: [booking_service_service_1.BookingServiceService],
        exports: [booking_service_service_1.BookingServiceService],
    })
], BookingServiceModule);
exports.BookingServiceModule = BookingServiceModule;
//# sourceMappingURL=booking-service.module.js.map