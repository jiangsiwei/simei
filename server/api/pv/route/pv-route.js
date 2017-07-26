"use strict";

const PvController = require("../controller/pv-controller");

module.exports = class PvRoutes {
  static init(router) {
    router
      .route("/api/pv")
      .get(PvController.getAll)
      .post(PvController.createNew);

    router
      .route("/api/pv/:id")
      .get(PvController.getById)
      .delete(PvController.deleteById)
      .patch(PvController.update);

    router
      .route("/api/pvMultiRemove")
      .post(PvController.multiRemove)

    router
      .route('/api/pvUpsert')
      .post(PvController.upsert);

    router
      .route("/api/pvCount")
      .get(PvController.count);
  }
}
