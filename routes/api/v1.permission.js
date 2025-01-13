
const { Router } = require("express");
const { checkRole } = require("../../middleware/roleMiddleware");
const { ROL } = require("../../utils/constants");

module.exports = function ({ PermissionController, AuthMiddleware, User, }) {
    const router = Router();

    router.get("/get-All-Permission", PermissionController.getAll);
    router.get("/get-One-Permission/:id", PermissionController.getOne);

    router.post("/create-Permission-Type", PermissionController.createWithType);
    router.post("/create-Permission", PermissionController.create);

    router.patch("/approve-permission/:id", [AuthMiddleware, checkRole({ roleName: (ROL.ADMIN), User })], PermissionController.approve);
    router.patch("/reject-permission/:id", [AuthMiddleware, checkRole({ roleName: (ROL.ADMIN), User })], PermissionController.reject);

    router.delete("/delete-permission/:id", PermissionController.delete);

    return router;
};
