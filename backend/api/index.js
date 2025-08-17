import app from '../server.js';
import serverless from 'serverless-http';

// Wrap Express app for Vercel serverless
export default serverless(app);
