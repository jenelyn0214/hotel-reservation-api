import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { ActivityLogModule } from '@src/api/activity-log/activity-log.module';
import { AuthModule } from '@src/api/auth/auth.module';
import { BusinessRequestModule } from '@src/api/business-request/business-request.module';
import { BusinessModule } from '@src/api/business/business.module';
import { BUXModule } from '@src/api/bux/bux.module';
import { CancelContractRequestModule } from '@src/api/cancel-contract-request/cancel-contract-request.module';
import { ChatModule } from '@src/api/chat/chat.module';
import { CompanyInformationModule } from '@src/api/company-information/company-information.module';
import { ConsumeRequestModule } from '@src/api/consume-request/consume-request.module';
import { ContactUsModule } from '@src/api/contact-us/contact-us.module';
import { ContractModule } from '@src/api/contract/contract.module';
import { DemoModule } from '@src/api/demo/demo.module';
import { EmergencyContactModule } from '@src/api/emergency-contact/emergency-contact.module';
import { ExtensionRequestModule } from '@src/api/extension-request/extension-request.module';
import { IboardtisementModule } from '@src/api/iboardtisement/iboardtisement.module';
import { InvoiceModule } from '@src/api/invoice/invoice.module';
import { MiscModule } from '@src/api/misc/misc.module';
import { NotificationModule } from '@src/api/notification/notification.module';
import { OtherInformationModule } from '@src/api/other-information/other-information.module';
import { PaymentModule } from '@src/api/payment/payment.module';
import { PropertyManagementModule } from '@src/api/property-management/property-management.module';
import { PropertyRequestModule } from '@src/api/property-request/property-request.module';
import { PropertyServiceMemberModule } from '@src/api/property-service-member/property-service-member.module';
import { PropertyServiceRequestModule } from '@src/api/property-service-request/property-service-request.module';
import { PropertyServiceModule } from '@src/api/property-service/property-service.module';
import { PropertyModule } from '@src/api/property/property.module';
import { PusherModule } from '@src/api/pusher/pusher.module';
import { ReferralModule } from '@src/api/referral/referral.module';
import { RefundRequestModule } from '@src/api/refund-request/refund-request.module';
import { RenewRequestModule } from '@src/api/renew-request/renew-request.module';
import { RentModule } from '@src/api/rent/rent.module';
import { RoleModule } from '@src/api/role/role.module';
import { RoomRequestModule } from '@src/api/room-request/room-request.module';
import { RoomModule } from '@src/api/room/room.module';
import { ServiceRequestModule } from '@src/api/service-request/service-request.module';
import { ServiceModule } from '@src/api/service/service.module';
import { TermConditionModule } from '@src/api/term-condition/term-condition.module';
import { TicketModule } from '@src/api/ticket/ticket.module';
import { ToDoModule } from '@src/api/to-do/to-do.module';
import { UserIDRequestModule } from '@src/api/user-id-request/user-id-request.module';
import { UserPermissionModule } from '@src/api/user-permission/user-permission.module';
import { UserRequestModule } from '@src/api/user-request/user-request.module';
import { UserModule } from '@src/api/user/user.module';
import { WalletModule } from '@src/api/wallet/wallet.module';
import { AtGuard } from '@src/common/guards';
import commonConfig from '@src/config/common.config';
import { DatabaseModule } from '@src/database/database.module';

import { CheckInRequestModule } from './api/check-in-request/check-in-request.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(commonConfig),
    DatabaseModule,
    MiscModule,
    BUXModule,
    PusherModule,
    ContractModule,
    AuthModule,
    ActivityLogModule,
    BusinessModule,
    BusinessRequestModule,
    CancelContractRequestModule,
    ChatModule,
    CheckInRequestModule,
    CompanyInformationModule,
    ConsumeRequestModule,
    ContactUsModule,
    DemoModule,
    EmergencyContactModule,
    ExtensionRequestModule,
    IboardtisementModule,
    InvoiceModule,
    NotificationModule,
    OtherInformationModule,
    PaymentModule,
    PropertyManagementModule,
    PropertyModule,
    PropertyServiceModule,
    PropertyServiceMemberModule,
    PropertyServiceRequestModule,
    PropertyRequestModule,
    ReferralModule,
    RefundRequestModule,
    RenewRequestModule,
    RentModule,
    RoleModule,
    RoomModule,
    RoomRequestModule,
    ServiceModule,
    ServiceRequestModule,
    TermConditionModule,
    TicketModule,
    ToDoModule,
    UserModule,
    UserIDRequestModule,
    UserPermissionModule,
    UserRequestModule,
    WalletModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
