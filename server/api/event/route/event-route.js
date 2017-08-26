'use strict';

const EventController = require("../controller/event-controller");

module.exports = class EventRoutes {
  static init(router) {
    router
      .route("/api/event")
      .get(EventController.getAll)
      .post(EventController.createNew);

    router
      .route("/api/event/:id")
      .get(EventController.getById)
      .delete(EventController.deleteById)
      .patch(EventController.update);

    router
      .route("/api/eventMultiRemove")
      .post(EventController.multiRemove)

    router
      .route('/api/eventUpsert')
      .post(EventController.upsert);

    router
      .route("/api/eventCount")
      .get(EventController.count);

    router
      .route("/api/eventSummary")
      .get(EventController.summary);

    router
      .route("/api/eventSummaryCount")
      .get(EventController.summaryCount);
  }
}
