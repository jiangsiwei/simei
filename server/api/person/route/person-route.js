'use strict';

const PersonController = require("../controller/person-controller");

module.exports = class PersonRoutes {
  static init(router) {
    router
      .route("/api/person")
      .get(PersonController.getAll)
      .post(PersonController.createNew);

    router
      .route("/api/person/:id")
      .get(PersonController.getById)
      .delete(PersonController.deleteById)
      .patch(PersonController.update);

    router
      .route("/api/personMultiRemove")
      .post(PersonController.multiRemove)

    router
      .route('/api/personUpsert')
      .post(PersonController.upsert);

    router
      .route("/api/personCount")
      .get(PersonController.count);
  }
}
