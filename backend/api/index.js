import app from "../app.js"; // your existing Express app
import { VercelRequest, VercelResponse } from "@vercel/node";

// Export serverless handler
export default function handler(req, res) {
  app(req, res);
}