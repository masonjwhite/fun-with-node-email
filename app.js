const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const { promisify } = require('es6-promisify');

const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandler');

// Require all passport handlers
require('./handlers/passportLocal');
require('./handlers/passportJwt');

// Initialize our Express app
const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use((req, res, next) => {
	req.login = promisify(req.login.bind(req));
	next();
});

// Express validator (used in registerUser)
app.use(expressValidator());

// App routes
app.use('/', routes);

// 404 Handler
app.use(errorHandlers.notFound);

// MongoDB validation errors
app.use(errorHandlers.sendValidationErrors);

// Otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// Handle production errors - don't show stack trace to users and reply with 500 code
app.use(errorHandlers.productionErrors);

// Export app so we can start it in start.js
module.exports = app;
