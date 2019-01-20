const uuid = require('uuid/v1');
const { promisify } = require('es6-promisify');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/*
  Middlewares
*/
exports.validateRegister = (req, res, next) => {
	// Sanitize and check fields aren't empty
	req
		.checkBody('email', 'That Email is not valid!')
		.isEmail();
	req.sanitizeBody('email').normalizeEmail({
		gmail_remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	});

	// Populate any validation errors
	const errors = req.validationErrors();

	// Send errors if they exist
	if (errors) {
		res.status(400).send({
			errorMessages: errors
		});
		return; // Stop function from running
	}

	next(); // Otherwise they're good!
};

/*
  Controller methods
*/
exports.registerUser = async (req, res) => {
	// Create new user
	const user = new User(req.body);

	// Save it to the DB using passport-local-mongoose plugin
	const register = promisify(User.register.bind(User));
	await register(user, req.body.password);

	// Generate a JWT token and set the header
	const token = await user.generateAuthToken();
	res.header('Authorization', `Bearer ${token}`);

	// Send it back
	res.send(user);
};

exports.getUserById = async (req, res) => {
	// Get user id from URL params
	const id = req.params.userId;

	// Query our database for a resort, based on ID
	const user = await User.findOne({ _id: id });

	// Send it back to the user
	res.send(user);
};

exports.updateUserById = async (req, res) => {
	// Get user id from URL params
	const id = req.params.userId;

	// Update our resort
	const updatedUser = await User.findOneAndUpdate(
		{ _id: id },
		req.body,
		{
			new: true, // return the new store instead of the old one
			runValidators: true
		}
	);

	// Send it back to the user
	res.send(updatedUser);
};

exports.deleteUserById = async (req, res) => {
	// Get user id from URL params
	const id = req.params.userId;

	// Delete the user from the DB
	await User.findOneAndRemove({ _id: id });

	// Send a response to user
	res.send({
		message: 'Successfully deleted user!'
	});
};

exports.getMe = async (req, res) => {
	// Get userID from req
	const id = req.user._id;

	// Find the user
	const user = await User.findOne({ _id: id });

	// Send it on back!
	res.send(user);
};

exports.updateMe = async (req, res) => {
	// Grab the user ID from req.user
	const id = req.user._id;

	// Update the user
	const updtedUser = await User.findOneAndUpdate(
		{ _id: id },
		req.body,
		{
			new: true, // return the new store instead of the old one
			runValidators: true
		}
	);

	// Send the updated user back
	res.send(updtedUser);
};

exports.deleteMe = async (req, res) => {
	// Grab the user ID from req.user
	const id = req.user._id;

	// Delete the user
	await User.findOneAndRemove({ _id: id });

	// Send back a message
	res.send({
		message: 'Successfully deleted user!'
	});
};
