'use strict';

const UserController = require("../controller/user-controller");
const auth = require('../../../auth/auth.service');

module.exports = class UserRoutes {

  static withoutToken(router) {
    //without token
    router.route("/api/user")
      .get(UserController.getAll)
      .post(UserController.create);

    router.route("/api/user/:id")
      .get(UserController.getById)
      .delete(auth.hasRole('admin'), UserController.removeById);

    router.route("/api/user/me")
        .post(UserController.me);

    router.route("/api/user/:id/password")
      .put(UserController.changePassword);
  }

  static withToken(router) {
    //with token
    router.route("/api/user")
      .get(auth.hasRole('admin'), UserController.getAll)
      .post(UserController.create);

    router.route("/api/user/:id")
      .get(auth.isAuthenticated(), UserController.getById)
      .delete(auth.hasRole('admin'), UserController.removeById);

    router.route("/api/user/me")
      .post(auth.isAuthenticated(), UserController.me);

    router.route("/api/user/:id/password")
      .put(auth.isAuthenticated(), UserController.changePassword);
  }

  static init(router) {

    // this.withoutToken(router);
    this.withToken(router);

  }
}
