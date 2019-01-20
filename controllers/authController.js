const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.login = async (req, res) => {
	// Find the user
	const user = await User.findById(req.user._id);

	// Generate a JWT token and set the header
	const token = await user.generateAuthToken();
	res.header('Authorization', `Bearer ${token}`);

	// Send it back
	res.send(req.user);
};

exports.logout = async (req, res) => {
	// Clear the client cookie on the response
	// TODO

	// Log them out via passport
	req.logout();

	// Send a message for now
	res.send('You logged out!');
};
