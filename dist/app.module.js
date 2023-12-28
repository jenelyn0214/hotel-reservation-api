"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const auth_module_1 = require("./api/auth/auth.module");
const guards_1 = require("./common/guards");
const common_config_1 = __importDefault(require("./config/common.config"));
const database_module_1 = require("./database/database.module");
const booking_service_module_1 = require("./api/booking-service/booking-service.module");
const customer_module_1 = require("./api/customer/customer.module");
const hall_booking_module_1 = require("./api/hall-booking/hall-booking.module");
const hall_module_1 = require("./api/hall/hall.module");
const menu_module_1 = require("./api/menu/menu.module");
const order_menu_module_1 = require("./api/order-menu/order-menu.module");
const order_module_1 = require("./api/order/order.module");
const queue_module_1 = require("./api/queue/queue.module");
const room_booking_module_1 = require("./api/room-booking/room-booking.module");
const room_type_module_1 = require("./api/room-type/room-type.module");
const room_module_1 = require("./api/room/room.module");
const service_module_1 = require("./api/service/service.module");
const user_module_1 = require("./api/user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'swagger-static'),
                serveRoot: process.env.ENVIRONMENT === 'development' ? '/' : '/api-docs',
            }),
            config_1.ConfigModule.forRoot(),
            config_1.ConfigModule.forFeature(common_config_1.default),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            booking_service_module_1.BookingServiceModule,
            customer_module_1.CustomerModule,
            hall_module_1.HallModule,
            hall_booking_module_1.HallBookingModule,
            menu_module_1.MenuModule,
            order_module_1.OrderModule,
            order_menu_module_1.OrderMenuModule,
            queue_module_1.QueueModule,
            room_module_1.RoomModule,
            room_booking_module_1.RoomBookingModule,
            room_type_module_1.RoomTypeModule,
            service_module_1.ServiceModule,
            user_module_1.UserModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map