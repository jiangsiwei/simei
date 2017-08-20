'use strict';

const TodoRoutes = require("../api/todo/route/todo-route");
const MenuRoutes = require("../api/menu/route/menu-route");
const PermissionRoutes = require("../api/permission/route/permission-route");
const UserRoutes = require("../api/user/route/user-route");
const PersonRoutes = require("../api/person/route/person-route");
const PvRoutes = require("../api/pv/route/pv-route");
const GiroRoutes = require("../api/giro/route/giro-route");
const ReceiptRoutes = require("../api/receipt/route/receipt-route");
const DashboardRoutes = require("../api/dashboard/route/dashboard-route");

//for merit system
const MemberRoutes = require("../api/member/route/member-route");
const EventRoutes = require("../api/event/route/event-route");

module.exports = class Routes {
  static init(app, router) {
    TodoRoutes.init(router);

    //for users
    MenuRoutes.init(router);
    PermissionRoutes.init(router);
    UserRoutes.init(router);

    //for main Routes
    PersonRoutes.init(router);
    PvRoutes.init(router);
    GiroRoutes.init(router);
    ReceiptRoutes.init(router);
    DashboardRoutes.init(router);

    //for merit system
    MemberRoutes.init(router)
    EventRoutes.init(router)

    app.use("/", router);
  }
}
