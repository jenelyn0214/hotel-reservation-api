"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatusEnum = exports.HallStatusEnum = exports.RoomStatusEnum = exports.OrderStatusEnum = exports.QueueStatusEnum = exports.MenuStatusEnum = void 0;
var MenuStatusEnum;
(function (MenuStatusEnum) {
    MenuStatusEnum["AVAILABLE"] = "available";
    MenuStatusEnum["UNAVAILABLE"] = "unavailable";
})(MenuStatusEnum = exports.MenuStatusEnum || (exports.MenuStatusEnum = {}));
var QueueStatusEnum;
(function (QueueStatusEnum) {
    QueueStatusEnum["AVAILABLE"] = "available";
    QueueStatusEnum["USED"] = "used";
})(QueueStatusEnum = exports.QueueStatusEnum || (exports.QueueStatusEnum = {}));
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["NEW"] = "new";
    OrderStatusEnum["PREPARING"] = "preparing";
    OrderStatusEnum["DONE"] = "done";
})(OrderStatusEnum = exports.OrderStatusEnum || (exports.OrderStatusEnum = {}));
var RoomStatusEnum;
(function (RoomStatusEnum) {
    RoomStatusEnum["AVAILABLE"] = "available";
    RoomStatusEnum["UNAVAILABLE"] = "unavailable";
    RoomStatusEnum["BOOKED"] = "booked";
    RoomStatusEnum["OCCUPIED"] = "occupied";
})(RoomStatusEnum = exports.RoomStatusEnum || (exports.RoomStatusEnum = {}));
var HallStatusEnum;
(function (HallStatusEnum) {
    HallStatusEnum["AVAILABLE"] = "available";
    HallStatusEnum["UNAVAILABLE"] = "unavailable";
    HallStatusEnum["BOOKED"] = "booked";
    HallStatusEnum["OCCUPIED"] = "occupied";
})(HallStatusEnum = exports.HallStatusEnum || (exports.HallStatusEnum = {}));
var BookingStatusEnum;
(function (BookingStatusEnum) {
    BookingStatusEnum["BOOKED"] = "booked";
    BookingStatusEnum["IN_PROGRESS"] = "in_progress";
    BookingStatusEnum["COMPLETED"] = "completed";
})(BookingStatusEnum = exports.BookingStatusEnum || (exports.BookingStatusEnum = {}));
//# sourceMappingURL=Status.enum.js.map