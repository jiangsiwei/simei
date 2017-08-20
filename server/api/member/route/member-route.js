'use strict';

const MemberController = require("../controller/member-controller");

module.exports = class MemberRoutes {
  static init(router) {
    router
      .route("/api/member")
      .get(MemberController.getAll)
      .post(MemberController.createNew);

    router
      .route("/api/member/:id")
      .get(MemberController.getById)
      .delete(MemberController.deleteById)
      .patch(MemberController.update);

    router
      .route("/api/memberMultiRemove")
      .post(MemberController.multiRemove)

    router
      .route('/api/memberUpsert')
      .post(MemberController.upsert);

    router
      .route("/api/memberCount")
      .get(MemberController.count);
  }
}
