const asyncHandler = require("express-async-handler");
const AppError = require("../utils/app-error");

const checkRole = (roleName) => {
    return asyncHandler(async (req, res, next) => {
        const user = req.user;

        if (!user) {
            throw new AppError("Usuario no autenticado", 401);
        }

        const userRole = await user.populate("role");

        if (userRole.role.name !== roleName) {
            throw new AppError(`No autorizado: se requiere el rol ${roleName}`, 403);
        }

        next();
    });
};
module.exports = { checkRole };
