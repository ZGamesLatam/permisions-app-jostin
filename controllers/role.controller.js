const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");
let _roleService = null;

module.exports = class RoleController extends BaseController {
    constructor({ RoleService }) {
        super(RoleService);
        _roleService = RoleService;
    }

    create = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const result = await _roleService.createRole(body);
        return appResponse(res, result);
    });
};
