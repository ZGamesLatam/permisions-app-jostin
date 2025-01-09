
const { Router } = require("express");

module.exports = function ({ PermissionController }) {
    const router = Router();

    router.get("/", PermissionController.getAll);
    router.get("/:id", PermissionController.getOne);
    router.post("/", PermissionController.create);
    router.put("/:id", PermissionController.update);
    router.delete("/:id", PermissionController.delete);
    router.post("/createWithType", PermissionController.createWithType);
    router.patch("/:id/approve", PermissionController.approve);
    router.patch("/:id/reject", PermissionController.reject);

    return router;
};
