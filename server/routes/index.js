"use strict";

const TodoRoutes = require("../api/todo/route/todo-route");
const MenuRoutes = require("../api/menu/route/menu-route");
const PermissionRoutes = require("../api/permission/route/permission-route");
const UserRoutes = require("../api/user/route/user-route");
const PayeeRoutes = require("../api/payee/route/payee-route");
const PvRoutes = require("../api/pv/route/pv-route");
const ReceiptRoutes = require("../api/receipt/route/receipt-route");

module.exports = class Routes {
  static init(app, router) {
    TodoRoutes.init(router);

    //for users
    MenuRoutes.init(router);
    PermissionRoutes.init(router);
    UserRoutes.init(router);

    //for main Routes
    PayeeRoutes.init(router);
    PvRoutes.init(router);
    ReceiptRoutes.init(router);

    app.use("/", router);
  }
}
