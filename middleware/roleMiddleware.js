const asyncHandler = require("express-async-handler");
const AppError = require("../utils/app-error");

const checkRole = ({ roleName, User }) =>
    asyncHandler(async (req, res, next) => {
        const { userAdminId } = req.body;

        if (!userAdminId) {
            throw new AppError("No se proporcionó el ID del usuario", 400);
        }
        const user = await User.findById(userAdminId).populate("role");

        if (!user) {
            throw new AppError("Usuario no encontrado", 404);
        }

        if (user.role.name !== roleName) {
            throw new AppError(`No autorizado: se requiere el rol ${roleName}`, 403);
        }

        next();
    });

module.exports = { checkRole };
