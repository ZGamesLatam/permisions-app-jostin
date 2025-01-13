const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");
const AppError = require("../utils/app-error");

let _role = null;

module.exports = class RoleService extends BaseService {
    constructor({ Role }) {
        super(Role);
        _role = Role;
    }

    createRole = catchServiceAsync(async (data) => {
        const existingRole = await _role.findOne({ name: data.name });
        if (existingRole) {
            throw new AppError("El rol ya existe", 400);
        }

        const newRole = await _role.create(data);
        return { data: newRole };
    });
};
