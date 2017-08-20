'use strict';

const DashboardController = require("../controller/dashboard-controller");

module.exports = class PvRoutes {
  static init(router) {
    router
      .route("/api/dashboard")
      .get(DashboardController.getAll);
  }
}
