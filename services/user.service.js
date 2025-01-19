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
    getAllUsers = catchServiceAsync(async () => {
        return await _user.find().select("firstName lastName");
    });

    login = catchServiceAsync(async (email, password) => {
        const user = await _user.findOne({ email });
        if (!user) {
            throw new AppError("Credenciales inválidas", 401);
        }

        const isValidPassword = await _authUtils.comparePassword(password, user.password);
        if (!isValidPassword) {
            throw new AppError("Credenciales inválidas", 401);
        }

        const token = _authUtils.generateToken(user._id);

        return {
            data: {
                token,
                userId: user._id
            }
        };
    });

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
};
