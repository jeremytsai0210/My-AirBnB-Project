const express = require('express');                     // express                  || Express
require('express-async-errors');                        // express-async-errors     || handling async route handlers
const morgan = require('morgan');                       // morgan                   || logging information about server requests/responses
const cors = require('cors');                           // cors                     || CORS (Cross-Origin Resource Sharing)
const csurf = require('csurf');                         // csurf                    || CSRF (Cross-Site Request Forgery) protection
const helmet = require('helmet');                       // helmet                   || security middleware
const cookieParser = require('cookie-parser');          // cookie-parser            || parsing cookies from requests
const { environment } = require('./config');            // imports environment object from ./config/index.js
const routes = require('./routes');                     // import routers from ./routes

// Checks if environment is in production or not.
const isProduction = environment === 'production';
const app = express();

// Connects morgan middleware for logging information about req/res.
app.use(morgan('dev'));

// Adds cookie-parser and express.json middlewares for parsing JSON 
// bodies of requests with `Content-Type`: 'application/json'.
app.use(cookieParser());
app.use(express.json());

/* ------------------------------ Begin Middlewares ------------------------------ */

// Security Middleware
if (!isProduction) {
    // Enable CORS only in development.
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app.
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method.
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  /* ------------------------------ End Middlewares ------------------------------ */
  // Connect all the routes AFTER al the middlewares
app.use(routes);

  module.exports = app;