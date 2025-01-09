const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");

let _permissionType = null;

module.exports = class PermissionTypeService extends BaseService {
    constructor({ PermissionType }) {
        super(PermissionType);
        _permissionType = PermissionType;
    }
    createPermissionType = catchServiceAsync(async (data) => {
        const newPermissionType = await _permissionType.create(data);
        return newPermissionType;
    });
};
