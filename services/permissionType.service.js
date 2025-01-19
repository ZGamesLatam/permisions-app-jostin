const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");

let _permissionType = null;

module.exports = class PermissionTypeService extends BaseService {
    constructor({ PermissionType }) {
        super(PermissionType);
        _permissionType = PermissionType;
    }

    getAllPermissionTypes = catchServiceAsync(async () => {
        const permissionTypes = await _permissionType.find({});
        return { data: permissionTypes };
    });

    createPermissionType = catchServiceAsync(async (data) => {
        const newPermissionType = await _permissionType.create(data);
        return { data: newPermissionType };
    });

};
