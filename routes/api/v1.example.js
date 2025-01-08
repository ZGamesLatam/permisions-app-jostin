const { Router } = require("express");

module.exports = function ({ ExampleController }) {
  const router = Router();
  router.get("/hello", ExampleController.hello);
  return router;
};