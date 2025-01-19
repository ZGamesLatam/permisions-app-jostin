
const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");

let _userService = null;

module.exports = class UserController extends BaseController {
    constructor({ UserService }) {
        super(UserService);
        _userService = UserService;
    }
    getAllUsers = catchControllerAsync(async (req, res) => {
        const users = await _user.find().select("firstName lastName");
        return appResponse(res, { result: users });
    });
    login = catchControllerAsync(async (req, res) => {
        const { email, password } = req.body;
        const result = await _userService.login(email, password);
        return appResponse(res, result);
    });
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
