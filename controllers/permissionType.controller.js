const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");
let _permissionTypeService = null
module.exports = class PermissionTypeController extends BaseController {
    constructor({ PermissionTypeService }) {
        super(PermissionTypeService);
        _permissionTypeService = PermissionTypeService;
    }
    createPermissionType = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const result = await _permissionTypeService.createPermissionType(body);
        return appResponse(res, result);
    });
};
