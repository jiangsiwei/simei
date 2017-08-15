'use strict';

const TodoController = require("../controller/todo-controller");

module.exports = class TodoRoutes {
  static init(router) {
    router
      .route("/api/todo")
      .get(TodoController.getAll)
      .post(TodoController.createNew);

    router
      .route("/api/todo/:id")
      .get(TodoController.getById)
      .delete(TodoController.deleteById)
      .patch(TodoController.update);

    router
      .route('/api/todoUpsert')
      .post(TodoController.upsert);
  }
}
