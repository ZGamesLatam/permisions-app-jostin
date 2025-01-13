const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware } = require("../middleware");
const api = require("./api");

module.exports = function ({
  ExampleRoutes,
  PermissionRoutes,
  UserRoutes,
  PermissionTypeRoutes,
  RoleRoutes
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter.use(express.json()).use(cors())
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }));
  apiRouter.use("/permission", PermissionRoutes);
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/permission-type", PermissionTypeRoutes)
  apiRouter.use("/role", RoleRoutes);

  router.use("/v1/api", apiRouter);
  router.use("/", (req, res) => {
    res.send("v.0.1.0.3");
  });
  router.use(ErrorMiddleware);

  return router;
};
