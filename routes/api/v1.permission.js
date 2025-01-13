
const { Router } = require("express");
const { checkRole } = require("../../middleware/roleMiddleware");
const { ROL } = require("../../utils/constants");

module.exports = function ({ PermissionController, AuthMiddleware, }) {
    const router = Router();

    router.get("/", PermissionController.getAll);
    router.get("/:id", PermissionController.getOne);

    router.post("/create-With-Type", PermissionController.createWithType);
    router.post("/", PermissionController.create);

    router.patch("/:id/approve", [AuthMiddleware, checkRole(ROL.ADMIN)], PermissionController.approve);
    router.patch("/:id/reject", [AuthMiddleware, checkRole(ROL.ADMIN)], PermissionController.reject);
    router.put("/:id", PermissionController.update);

    router.delete("/:id", PermissionController.delete);

    return router;
};
