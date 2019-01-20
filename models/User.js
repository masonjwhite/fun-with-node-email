const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address'],
		required: 'Please Supply an email address'
	},
	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}
	]
});

// Override toJSON to avoid sending sensitive fields
userSchema.methods.toJSON = function() {
	return {
		email: this.email
	};
};

// Generate an auth token for the user (used for register and login)
userSchema.methods.generateAuthToken = async function() {
	const access = 'auth';

	// Sign the token
	const token = jwt
		.sign(
			{
				_id: this._id.toHexString(),
				access
			},
			process.env.JWT_SECRET
		)
		.toString();

	// Add the token to their tokens array
	this.tokens = this.tokens.concat([{ access, token }]);

	// Save it!
	await this.save();

	return token;
};

userSchema.plugin(mongodbErrorHandler);

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);
