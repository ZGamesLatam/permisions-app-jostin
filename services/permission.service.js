
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

        // 1) Validar que el tipo de permiso existe
        const typeExists = await _permissionType.findById(permissionTypeId);
        if (!typeExists) {
            throw new AppError("Tipo de permiso no encontrado", 404);
        }

        // 2) Crear el nuevo permiso
        const newPermission = await _permission.create(permissionData);

        return newPermission;
    });

    // Por ejemplo, aprobación o rechazo:
    approvePermission = catchServiceAsync(async (permissionId, userAdminId) => {
        const permission = await _permission.findById(permissionId);
        if (!permission) {
            throw new AppError("Permiso no encontrado", 404);
        }

        permission.status = "Aprobado";
        permission.approvedBy = userAdminId;
        await permission.save();

        return permission;
    });

    rejectPermission = catchServiceAsync(async (permissionId, userAdminId, reason) => {
        const permission = await _permission.findById(permissionId);
        if (!permission) {
            throw new AppError("Permiso no encontrado", 404);
        }

        permission.status = "Rechazado";
        permission.approvedBy = userAdminId;
        permission.reasonForRejection = reason;
        await permission.save();

        return permission;
    });
};
