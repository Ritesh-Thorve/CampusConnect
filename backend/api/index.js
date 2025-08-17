import app from "../app";
import serverless from "serverless-http";

export const config = {
  api: {
    bodyParser: false,
  },
};

console.log("Vercel serverless function initialized");

export default serverless(app);
