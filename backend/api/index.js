import app from '../app'
import serverless from "serverless-http";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Health check route
app.get("/", (req, res) => {
  res.send("Vercel backend is running");
});

export default serverless(app);
