
const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");

let _permission = null;
let _permissionType = null;

module.exports = class PermissionService extends BaseService {
    constructor({ Permission, PermissionType }) {

        super(Permission);
        _permission = Permission;
        _permissionType = PermissionType;
    }

    createWithType = catchServiceAsync(async (permissionData) => {
        const { permissionTypeId } = permissionData;

        const typeExists = await _permissionType.findById(permissionTypeId);
        if (!typeExists) {
            throw new AppError("Tipo de permiso no encontrado", 404);
        }

        const newPermission = await _permission.create(permissionData);

        return { data: newPermission };
    });

    approvePermission = catchServiceAsync(async (permissionId, userAdminId) => {
        const updatedPermission = await _permission.findOneAndUpdate(
            { _id: permissionId },
            {
                status: "Aprobado",
                approvedBy: userAdminId,
            },
            { new: true }
        );

        if (!updatedPermission) {
            throw new AppError("Permiso no encontrado", 404);
        }

        return { data: updatedPermission };
    });

    rejectPermission = catchServiceAsync(async (permissionId, userAdminId, reason) => {
        const updatedPermission = await _permission.findOneAndUpdate(
            { _id: permissionId },
            {
                status: "Rechazado",
                approvedBy: userAdminId,
                reasonForRejection: reason,
            },
            { new: true }
        );

        if (!updatedPermission) {
            throw new AppError("Permiso no encontrado", 404);
        }

        return { data: updatedPermission };
    });
};
