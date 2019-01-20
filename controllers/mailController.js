const { send } = require('../handlers/mail');

exports.sendMail = async (req, res) => {
	await send({
		filename: 'testEmail', // Name of the pug file email template
		subject: 'Testing Email', // Subject of the email
		user: {
			email: req.user.email // Who we're sending it to
		}
	});

	res.send('Sending email...'); // Just for debugging
};
