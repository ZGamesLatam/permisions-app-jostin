
const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const { STATUS_PERMISSION } = require("../utils/constants");
let _permission = null;
let _permissionType = null;

module.exports = class PermissionService extends BaseService {
    constructor({ Permission, PermissionType, }) {

        super(Permission);
        _permission = Permission;
        _permissionType = PermissionType;
    }
    getAllPermissions = catchServiceAsync(async (filter) => {
        const permissions = await _permission
            .find(filter)
            .populate("userId", "firstName lastName")
            .populate("permissionTypeId", "name")
            .exec();

        const totalCount = await _permission.countDocuments(filter);

        return {
            data: {
                result: permissions,
                totalCount,
            }

        };
    });

    findAllPermissions = catchServiceAsync(async (filters) => {
        const { status, permissionTypeId, userName, limit = 10, page = 1 } = filters;

        const query = {
            ...(status && { status }),
            ...(permissionTypeId && { permissionTypeId }),
        };

        if (userName) {
            const users = await _permission
                .find()
                .populate({
                    path: "userId",
                    match: {
                        $or: [
                            { firstName: { $regex: userName.trim(), $options: "i" } },
                            { lastName: { $regex: userName.trim(), $options: "i" } },
                        ],
                    },
                    select: "_id",
                })
                .exec();

            const userIds = users
                .filter((permission) => permission.userId)
                .map((permission) => permission.userId._id);

            if (userIds.length > 0) {
                query.userId = { $in: userIds };
            } else {

                return { data: { result: [], totalCount: 0 } };
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const totalCount = await _permission.countDocuments(query);
        const result = await _permission
            .find(query)
            .populate("userId", "firstName lastName")
            .populate("permissionTypeId", "name")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        return { data: { result, totalCount } };
    });



    createWithType = catchServiceAsync(async (permissionData) => {
        const { permissionTypeId, userId } = permissionData;

        if (!userId) {
            throw new AppError("El campo userId es obligatorio", 400);
        }

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
                status: STATUS_PERMISSION.APPROVED,
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
                status: STATUS_PERMISSION.REJECTED,
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
