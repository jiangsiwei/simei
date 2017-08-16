'use strict';

const ReceiptController = require("../controller/receipt-controller");

module.exports = class ReceiptRoutes {
  static init(router) {
    router
      .route("/api/receipt")
      .get(ReceiptController.getAll)
      .post(ReceiptController.createNew);

    router
      .route("/api/receipt/:id")
      .get(ReceiptController.getById)
      .delete(ReceiptController.deleteById)
      .patch(ReceiptController.update);

    router
      .route('/api/receiptUpsert')
      .post(ReceiptController.upsert);

    router
      .route("/api/receiptMultiRemove")
      .post(ReceiptController.multiRemove)

    router
      .route("/api/receiptCount")
      .get(ReceiptController.count);

    router
      .route("/api/receiptMonthlySum")
      .get(ReceiptController.monthlySum);

    router
      .route("/api/receiptYearlySum")
      .get(ReceiptController.yearlySum);
  }
}
