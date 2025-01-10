const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");
let _permissionService = null;

module.exports = class PermissionController extends BaseController {
    constructor({ PermissionService }) {
        super(PermissionService);
        _permissionService = PermissionService;
    }
    createWithType = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const newPermission = await _permissionService.createWithType(body);
        return appResponse(res, newPermission);
    });
    approve = catchControllerAsync(async (req, res) => {
        const { id } = req.params;
        const { userAdminId } = req.body;
        const result = await _permissionService.approvePermission(id, userAdminId);
        return appResponse(res, result);
    });
    reject = catchControllerAsync(async (req, res) => {
        const { id } = req.params;
        const { userAdminId, reason } = req.body;
        const result = await _permissionService.rejectPermission(id, userAdminId, reason);
        return appResponse(res, result);
    });
};
