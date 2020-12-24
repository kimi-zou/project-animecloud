// External dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

// Internal dependencies
const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

//-------------------------- App --------------------------
// Initialize Express App
const app = express();

//-------------------- Middlewards -------------------------
// Express Middlewares
app.use(morgan('dev')); // Log req, res info
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse req's JSON body

// Express Security Middlewares
if (!isProduction) app.use(cors()); // Allow CORS when develop
app.use(helmet({ contentSecurityPolicy: false })); // helmet helps set a variety of headers to better secure your app
app.use(csurf({ cookie: {
  secure: isProduction, 
  sameSite: isProduction && 'Lax',
  httpOnly: true,  // Not allow js script to read the cookie
}})) // Add _csrf cookie to all res
     // Add req.csrfToken to all req; 
     // req.csrfToken set to "XSRF-TOKEN" cookie: in headers (other than GET req)

// Express Middleware
app.use(routes);

//------------------------- Error handlers ------------------
// Handle resource-not-found error 
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.")
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err); // Pass err to the next error handler
});

// Handle sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
    err.title = "Validation error";
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;