
const { Router } = require("express");
const { checkRole } = require("../../middleware/roleMiddleware");
const { ROL } = require("../../utils/constants");
const upload = require('../../middleware/uploadMiddleware');

module.exports = function ({ PermissionController, AuthMiddleware, User, }) {
    const router = Router();

    router.get("/get-all-permissions", PermissionController.getAllPermissions);
    router.get("/get-one-permission/:id", PermissionController.getOne);
    router.get("/filter-permissions", [AuthMiddleware], PermissionController.findAllPermissions);

    router.post("/create-permission-type", upload.single('attachment'), PermissionController.createWithType);
    router.post("/create-permission", PermissionController.create);

    router.patch("/approve-permission/:id", [AuthMiddleware, checkRole({ roleName: (ROL.ADMIN), User })], PermissionController.approve);
    router.patch("/reject-permission/:id", [AuthMiddleware, checkRole({ roleName: (ROL.ADMIN), User })], PermissionController.reject);

    router.delete("/delete-permission/:id", PermissionController.delete);

    return router;
};