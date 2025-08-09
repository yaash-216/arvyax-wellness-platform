import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || !payload.id)
      return res.status(401).json({ message: "Invalid token" });

    const user = await User.findById(payload.id).select("_id email");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user._id.toString(), email: user.email };
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default authMiddleware;
