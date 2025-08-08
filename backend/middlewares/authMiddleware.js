import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Read token directly from Authorization header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // ✅ Attach userId to request
    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
