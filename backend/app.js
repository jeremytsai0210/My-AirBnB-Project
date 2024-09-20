const express = require('express');                     // express                  || Express
require('express-async-errors');                        // express-async-errors     || handling async route handlers
const morgan = require('morgan');                       // morgan                   || logging information about server requests/responses
const cors = require('cors');                           // cors                     || CORS (Cross-Origin Resource Sharing)
const csurf = require('csurf');                         // csurf                    || CSRF (Cross-Site Request Forgery) protection
const helmet = require('helmet');                       // helmet                   || security middleware
const cookieParser = require('cookie-parser');          // cookie-parser            || parsing cookies from requests
const { environment } = require('./config');            // imports environment object from ./config/index.js
const routes = require('./routes');                     // import routers from ./routes
const { ValidationError } = require('sequelize');       // import ValidationError object from sequelize package to handle errors from a Sequelize database validation error

// Checks if environment is in production or not.
const isProduction = environment === 'production';
const app = express();

// Connects morgan middleware for logging information about req/res.
app.use(morgan('dev'));

// Adds cookie-parser and express.json middlewares for parsing JSON 
// bodies of requests with `Content-Type`: 'application/json'.
app.use(cookieParser());
app.use(express.json());

/* -------------------- Begin Security Middlewares -------------------- */

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
/* -------------------- End Security Middlewares -------------------- */

// Connect all the routes
app.use(routes);

/* -------------------- Begin Error-Handling Middlewares -------------------- */
// Error Handling Middleware
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
});

/* -------------------- End Error-Handling Middlewares -------------------- */

module.exports = app;