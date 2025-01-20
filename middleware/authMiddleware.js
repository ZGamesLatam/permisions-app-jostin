const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/app-error");

const protect = ({ User, config }) =>
  asyncHandler(async (req, res, next) => {
    const token = req.headers["x-api-key"];
    if (token) {
      try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id }).select("-password").populate("role");
        if (!user) {
          throw new AppError("Usuario no encontrado", 404);
        }
        req.user = user;
        next();
      } catch (error) {
        throw new AppError("No autorizado", 401);
      }
    } else {
      throw new AppError("No autorizado, no se envió el token", 401);
    }
  });
module.exports = { protect };
