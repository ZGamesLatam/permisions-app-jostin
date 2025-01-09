const BaseService = require("./base.service");
const catchServiceAsync = require("../utils/catch-service-async");
const AppError = require("../utils/app-error");

let _user = null;
let _authUtils = null;

module.exports = class UserService extends BaseService {
    constructor({ User, AuthUtils }) {
        super(User);
        _user = User;
        _authUtils = AuthUtils;
    }
    createUser = catchServiceAsync(async (data) => {
        const existing = await _user.findOne({ email: data.email });
        if (existing) {
            throw new AppError("El email ya está registrado", 400);
        }

        if (data.password) {
            data.password = await _authUtils.hashPassword(data.password);
        }

        const newUser = await _user.create(data);
        return { data: newUser };
    });

    updateUserRole = catchServiceAsync(async (userId, newRole) => {
        const updatedUser = await _user.findOneAndUpdate(
            { _id: userId },
            { role: newRole },
            { new: true }
        );

        if (!updatedUser) {
            throw new AppError("Usuario no encontrado", 404);
        }

        return { data: updatedUser };
    });
};
