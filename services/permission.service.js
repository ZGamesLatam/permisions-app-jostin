
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

    // approvePermission = catchServiceAsync(async (permissionId, userAdminId) => {
    //     const filter = { _id: permissionId };
    //     const update = {
    //         status: "Aprobado",
    //         approvedBy: userAdminId,
    //     };

    //     // Usamos findOneAndUpdate para realizar la operación atómica
    //     const updatedPermission = await _permission.findOneAndUpdate(filter, update, {
    //         new: true, // Devuelve el documento actualizado
    //     });

    //     if (!updatedPermission) {
    //         throw new AppError("Permiso no encontrado", 404);
    //     }

    //     return appResponse(updatedPermission);
    // });

    // rejectPermission = catchServiceAsync(async (permissionId, userAdminId, reason) => {
    //     const filter = { _id: permissionId };
    //     const update = {
    //         status: "Rechazado",
    //         approvedBy: userAdminId,
    //         reasonForRejection: reason,
    //     };

    //     // Usamos findOneAndUpdate para realizar la operación atómica
    //     const updatedPermission = await _permission.findOneAndUpdate(filter, update, {
    //         new: true, // Devuelve el documento actualizado
    //     });

    //     if (!updatedPermission) {
    //         throw new AppError("Permiso no encontrado", 404);
    //     }

    //     return appResponse(updatedPermission);
    // });







    approvePermission = catchServiceAsync(async (permissionId, userAdminId) => {
        const permission = await _permission.findById(permissionId);
        if (!permission) {
            throw new AppError("Permiso no encontrado", 404);
        }

        permission.status = "Aprobado";
        permission.approvedBy = userAdminId;
        await permission.save();

        return { data: permission };
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

        return { data: permission };

    });
};
