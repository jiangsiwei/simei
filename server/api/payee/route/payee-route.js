"use strict";

const PayeeController = require("../controller/payee-controller");

module.exports = class PayeeRoutes {
  static init(router) {
    router
      .route("/api/payee")
      .get(PayeeController.getAll)
      .post(PayeeController.createNew);

    router
      .route("/api/payee/:id")
      .get(PayeeController.getById)
      .delete(PayeeController.deleteById)
      .patch(PayeeController.update);

    router
      .route("/api/payeeMultiRemove")
      .post(PayeeController.multiRemove)

    router
      .route('/api/payeeUpsert')
      .post(PayeeController.upsert);

    router
      .route("/api/payeeCount")
      .get(PayeeController.count);
  }
}
