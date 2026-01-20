import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware для перевірки токена
export const protect = async (req, res, next) => {
  try {
    // Токен очікується у заголовку Authorization: Bearer <token>
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Перевіряємо токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Знаходимо користувача по id з токена
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token failed" });
  }
};

// Middleware для перевірки ролі owner
export const ownerOnly = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({ success: false, message: "Access denied: Owners only" });
  }
  next();
};

// Middleware для перевірки ролі admin (якщо потрібно)
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied: Admins only" });
  }
  next();
};