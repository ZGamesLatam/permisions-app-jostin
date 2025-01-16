
const { Router } = require("express");
const { checkRole } = require("../../middleware/roleMiddleware");
const { ROL } = require("../../utils/constants");

module.exports = function ({ PermissionController, AuthMiddleware, User, }) {
    const router = Router();

    router.get("/get-all-permission", PermissionController.getAllPermissions);
    router.get("/get-one-permission/:id", PermissionController.getOne);
    router.get("/filter-permissions", PermissionController.findAllPermissions);

    router.post("/create-permission-type", PermissionController.createWithType);
    router.post("/create-permission", PermissionController.create);

    router.patch("/approve-permission/:id", [AuthMiddleware, checkRole({ roleName: (ROL.ADMIN), User })], PermissionController.approve);
    router.patch("/reject-permission/:id", [AuthMiddleware, checkRole({ roleName: (ROL.ADMIN), User })], PermissionController.reject);

    router.delete("/delete-permission/:id", PermissionController.delete);

    return router;
};
