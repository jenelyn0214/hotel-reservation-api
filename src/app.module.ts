import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from '@src/api/auth/auth.module';
import { AtGuard } from '@src/common/guards';
import commonConfig from '@src/config/common.config';
import { DatabaseModule } from '@src/database/database.module';

import { BookingServiceModule } from './api/booking-service/booking-service.module';
import { CustomerModule } from './api/customer/customer.module';
import { HallBookingModule } from './api/hall-booking/hall-booking.module';
// eslint-disable-next-line import/order
import { HallModule } from './api/hall/hall.module';
import { MenuModule } from './api/menu/menu.module';
import { OrderMenuModule } from './api/order-menu/order-menu.module';
// eslint-disable-next-line import/order
import { OrderModule } from './api/order/order.module';
import { QueueModule } from './api/queue/queue.module';
import { RoomBookingModule } from './api/room-booking/room-booking.module';
import { RoomTypeModule } from './api/room-type/room-type.module';
// eslint-disable-next-line import/order
import { RoomModule } from './api/room/room.module';
import { ServiceModule } from './api/service/service.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.ENVIRONMENT === 'development' ? '/' : '/api-docs',
    }),
    ConfigModule.forRoot(),
    ConfigModule.forFeature(commonConfig),
    DatabaseModule,
    AuthModule,
    BookingServiceModule,
    CustomerModule,
    HallModule,
    HallBookingModule,
    MenuModule,
    OrderModule,
    OrderMenuModule,
    QueueModule,
    RoomModule,
    RoomBookingModule,
    RoomTypeModule,
    ServiceModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
