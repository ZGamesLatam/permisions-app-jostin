const { Router } = require('express');
module.exports = function ({ UserController }) {
    const router = Router();
    router.get('/', UserController.getAll);
    router.get('/:id', UserController.getOne);
    router.post('/', UserController.create);
    router.put('/:id', UserController.update);
    router.delete('/:id', UserController.delete);

    router.post('/createUser', UserController.createUser);
    router.patch('/:id/role', UserController.updateRole);

    return router;
};
