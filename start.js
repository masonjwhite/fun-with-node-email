const mongoose = require('mongoose');

// Set the variables in variables.env to process.env
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(
	process.env.DATABASE,
	{
		useNewUrlParser: true,
		useCreateIndex: true
	}
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
	console.error(
		`❌  Whoops! Something went wrong with the DB connection! 🙁 🙁 🙁  → ${err}`
	);
});

// Import all of our models
require('./models/User');

// Start our app
const app = require('./app');
app.set('port', process.env.port || 5000);

const server = app.listen(app.get('port'), () => {
	console.log(
		`✅  Express server running → PORT ${
			server.address().port
		}`
	);
});
