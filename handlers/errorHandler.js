/*
    Async/Await error handler (avoids unnecessary try/catch)
*/
exports.catchErrors = fn => {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	};
};

/*
    Not Found error handler
*/
exports.notFound = (req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
};

/*
	MongoDB Validation error handler
*/
exports.sendValidationErrors = (err, req, res, next) => {
	if (!err.errors) return next(err);
	res.status(400).send(err.errors);
};

/*
	Development error handler
*/
exports.developmentErrors = (err, req, res, next) => {
	res.status(err.status || 500).send({
		errorMessage: err.message,
		status: err.status
	});
};

/*
	Production error handler (hides stack trace from users)
*/
exports.productionErrors = (err, req, res, next) => {
	res.status(err.status || 500).send({
		errorMessage: err.message,
		status: err.status
	});
};
