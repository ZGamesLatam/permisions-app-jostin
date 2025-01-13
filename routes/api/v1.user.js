const { Router } = require('express');
module.exports = function ({ UserController }) {
    const router = Router();
    router.get('/', UserController.getAll);
    router.get('/:id', UserController.getOne);

    router.post("/login", UserController.login);
    router.post('/', UserController.create);
    router.post('/create-user', UserController.createUser);

    router.put('/:id', UserController.update);
    router.patch('/:id/role', UserController.updateRole);

    router.delete('/:id', UserController.delete);

    return router;
};
