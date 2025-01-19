
const { Router } = require("express");

module.exports = function ({ PermissionTypeController }) {
    const router = Router();
    router.get("/get-permissions-type", PermissionTypeController.getAllPermissionTypes);
    router.get("/get-permission-type/:id", PermissionTypeController.getOne);

    router.post("/create-permission-type", PermissionTypeController.createPermissionType);

    router.put("/update-permission-type/:id", PermissionTypeController.update);

    router.delete("/delete-permission-type/:id", PermissionTypeController.delete);

    return router;
};
