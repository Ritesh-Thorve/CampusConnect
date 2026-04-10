import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    // Strict Bearer format check
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
      return res.status(401).json({ error: "Invalid token format. Use: Bearer <token>" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // Attach only necessary fields to req.user
    req.user = {
      userId: String(decoded.userId),
      // role: decoded.role  ← uncomment if you use roles
    };

    next();

  } catch (err) {
    // Avoid logging in production
    if (process.env.NODE_ENV !== "production") {
      console.error("Auth middleware error:", err.message);
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (err.name === "NotBeforeError") {
      return res.status(401).json({ error: "Token not yet valid" });
    }

    return res.status(500).json({ error: "Authentication error" });
  }
};