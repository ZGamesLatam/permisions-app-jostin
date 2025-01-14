const { Router } = require("express");

module.exports = function ({ RoleController }) {
    const router = Router();

    router.get("/get-rols", RoleController.getAll);
    router.get("/get-rol/:id", RoleController.getOne);

    router.post("/create-rol", RoleController.create);

    router.put("/update-rol/:id", RoleController.update);

    router.delete("/delete-rol/:id", RoleController.delete);

    return router;
};
