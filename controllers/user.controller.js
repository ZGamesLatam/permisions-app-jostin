
const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");

module.exports = class UserController extends BaseController {
    constructor({ UserService }) {
        super(UserService);
        this.userService = UserService;
    }
    createUser = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const newUser = await this.userService.createUser(body);
        return res.status(201).json(newUser);
    });

    updateRole = catchControllerAsync(async (req, res) => {
        const { id } = req.params;
        const { role } = req.body;
        const updatedUser = await this.userService.updateUserRole(id, role);
        return res.status(200).json(updatedUser);
    });
};
