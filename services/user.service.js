const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");
const AppError = require("../utils/app-error");

let _user = null;

module.exports = class UserService extends BaseService {
    constructor({ User }) {
        super(User);
        _user = User;
    }
    createUser = catchServiceAsync(async (data) => {
        const existing = await _user.findOne({ email: data.email });
        if (existing) {
            throw new AppError("El email ya está registrado", 400);
        }
        const newUser = await _user.create(data);
        return newUser;
    });

    updateUserRole = catchServiceAsync(async (userId, newRole) => {
        const user = await _user.findById(userId);
        if (!user) {
            throw new AppError("Usuario no encontrado", 404);
        }
        user.role = newRole;
        await user.save();
        return user;
    });
};
