'use strict';

const PermissionController = require("../controller/permission-controller");

module.exports = class PermissionRoutes {
  static init(router) {
    router
      .route("/api/permission")
      .get(PermissionController.getAll)
      .post(PermissionController.createNew);

    router
      .route("/api/permission/:id")
      .get(PermissionController.getById)
      .delete(PermissionController.deleteById)
      .patch(PermissionController.update);

    router
      .route('/api/permissionUpsert')
      .post(PermissionController.upsert);
  }
}
