const { Router } = require("express");

module.exports = function ({ RoleController }) {
    const router = Router();

    router.post("/", RoleController.create);
    router.get("/", RoleController.getAll);
    router.get("/:id", RoleController.getOne);
    router.put("/:id", RoleController.update);
    router.delete("/:id", RoleController.delete);

    return router;
};
