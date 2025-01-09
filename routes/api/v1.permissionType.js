
const { Router } = require("express");

module.exports = function ({ PermissionTypeController }) {
    const router = Router();
    router.get("/", PermissionTypeController.getAll);
    router.get("/:id", PermissionTypeController.getOne);
    router.post("/", PermissionTypeController.createPermissionType);
    router.put("/:id", PermissionTypeController.update);
    router.delete("/:id", PermissionTypeController.delete);

    return router;
};
