const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/app-error");

const protect = ({ User, config }) => asyncHandler(async (req, res, next) => {
  let token = req.headers["x-api-key"];
  if (token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = await User.findOne({ _id: decoded.id }).select("-password");
      next();
    } catch (error) {
      throw new AppError("No autorizado", 401);
    }
  }
  if (!token) {
    throw new AppError("No autorizado, no se envió el token");
  }
});
module.exports = { protect };
