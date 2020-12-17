// External dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Internal dependencies
const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

// Initialize Express App
const app = express();

// Express Middlewares
app.use(morgan('dev')); // Log req, res info
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse req's JSON body

// Express Security Middlewares
if (!isProduction) app.use(cors()); // Allow CORS when develop
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(csurf({ cookie: {
  secure: isProduction, 
  sameSite: isProduction && 'Lax',
  httpOnly: true,  // Not allow js to read the cookie
}})) // Add _csrf cookie to all res
     // Add req.csrfToken to all req; 
     // req.csrfToken set to "XSRF-TOKEN" cookie: in headers (other than GET req)

// Express Middleware
app.use(routes);

module.exports = app;