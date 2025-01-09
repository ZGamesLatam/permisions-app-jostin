
const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");

let _userService = null;

module.exports = class UserController extends BaseController {
    constructor({ UserService }) {
        super(UserService);
        _userService = UserService;
    }
    createUser = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const newUser = await _userService.createUser(body);
        return appResponse(res, newUser);
    });

    updateRole = catchControllerAsync(async (req, res) => {
        const { id } = req.params;
        const { role } = req.body;
        const updatedUser = await _userService.updateUserRole(id, role);
        return appResponse(res, updatedUser);
    });
};
