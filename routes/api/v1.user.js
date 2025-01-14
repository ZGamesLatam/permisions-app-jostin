const { Router } = require('express');
module.exports = function ({ UserController }) {
    const router = Router();
    router.get('/get-Users', UserController.getAll);
    router.get('/get-User/:id', UserController.getOne);

    router.post("/login", UserController.login);
    router.post('/create-user', UserController.createUser);

    router.put('/update/:id', UserController.update);
    router.patch('/update-rol/:id/role', UserController.updateRole);

    router.delete('/delete-user/:id', UserController.delete);

    return router;
};
