'use strict';

const MenuController = require("../controller/menu-controller");

module.exports = class MenuRoutes {
  static init(router) {
    router
      .route("/api/menu")
      .get(MenuController.getAll)
      .post(MenuController.createNew);

    router
      .route("/api/menu/:id")
      .get(MenuController.getById)
      .delete(MenuController.deleteById)
      .patch(MenuController.update);

    router
      .route('/api/menuUpsert')
      .post(MenuController.upsert);
  }
}
