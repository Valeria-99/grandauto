import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Нет токена" });
  }

  try {
    // Обычно токен приходит как "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Проверяем токен и получаем payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Токен недействителен" });
    }

    // Находим пользователя по id из payload
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ success: false, message: "Пользователь не найден" });
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ success: false, message: "Не авторизован" });
  }
};
