const BaseController = require("./base.controller");
const catchControllerAsync = require("../utils/catch-controller-async");

module.exports = class PermissionTypeController extends BaseController {
    constructor({ PermissionTypeService }) {
        super(PermissionTypeService);
        this.permissionTypeService = PermissionTypeService;
    }
    createPermissionType = catchControllerAsync(async (req, res) => {
        const { body } = req;
        const newDoc = await this.permissionTypeService.createPermissionType(body);
        return res.status(201).json(newDoc);
    });
};
