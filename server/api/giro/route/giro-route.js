'use strict';

const GiroController = require("../controller/giro-controller");

module.exports = class GiroRoutes {
  static init(router) {
    router
      .route("/api/giro")
      .get(GiroController.getAll)
      .post(GiroController.createNew);

    router
      .route("/api/giro/:id")
      .get(GiroController.getById)
      .delete(GiroController.deleteById)
      .patch(GiroController.update);

    router
      .route("/api/giroMultiRemove")
      .post(GiroController.multiRemove)

    router
      .route('/api/giroUpsert')
      .post(GiroController.upsert);

    router
      .route("/api/giroCount")
      .get(GiroController.count);
  }
}
