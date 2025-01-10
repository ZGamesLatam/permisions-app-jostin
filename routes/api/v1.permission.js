
const { Router } = require("express");

module.exports = function ({ PermissionController }) {
    const router = Router();

    router.get("/", PermissionController.getAll);
    router.get("/:id", PermissionController.getOne);

    router.post("/create-With-Type", PermissionController.createWithType);
    router.post("/", PermissionController.create);

    router.patch("/:id/approve", PermissionController.approve);
    router.patch("/:id/reject", PermissionController.reject);
    router.put("/:id", PermissionController.update);

    router.delete("/:id", PermissionController.delete);

    return router;
};
