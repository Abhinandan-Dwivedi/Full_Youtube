import express from 'express';
import proxyCloudinary from '../Controllers/cloudinaryProxy.controller.js';

const router = express.Router();

// Proxy any path after /cloudinary/ to https://res.cloudinary.com/<path>
// Use a named wildcard parameter compatible with path-to-regexp
// so routers that require a param name won't throw a PathError.
// Use Express-style splat parameter `:path*` which works with this router
// NOTE: This router previously defined a wildcard route that caused a path-to-regexp
// parsing error in this environment. The cloudinary proxy is mounted directly
// in `src/app.js` at `/api/v1/media/cloudinary` to avoid router pattern issues.

export default router;

 