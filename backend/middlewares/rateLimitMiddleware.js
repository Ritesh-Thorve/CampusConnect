import rateLimit from "express-rate-limit";

// General API limiter (100 requests / 15 mins per IP)
export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});

// Auth-specific limiter (5 requests / 1 min per IP)
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many login/signup attempts. Please try again later."
  }
});
