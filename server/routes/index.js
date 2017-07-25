"use strict";

const TodoRoutes = require("../api/todo/route/todo-route");
const MenuRoutes = require("../api/menu/route/menu-route");
const PermissionRoutes = require("../api/permission/route/permission-route");
const UserRoutes = require("../api/user/route/user-route");

module.exports = class Routes {
  static init(app, router) {
    TodoRoutes.init(router);

    //for users
    MenuRoutes.init(router);
    PermissionRoutes.init(router);
    UserRoutes.init(router);


    app.use("/", router);
  }
}
