const nodeMailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const { promisify } = require('es6-promisify');

/*
  Create a transport to handle sending our email
*/
const transport = nodeMailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

/*
  Generate HTML helper function
*/
const generateHTML = (filename, options = {}) => {
	// Render HTML from the desired pug file
	const html = pug.renderFile(
		`${__dirname}/../views/email/${options.filename}.pug`,
		options
	);

	// Inline any CSS styles
	const inlined = juice(html);

	return inlined;
};

/*
  Send function we can use elsewhere in our app
*/
exports.send = async options => {
	// Generate HTML using helper function above
	const html = generateHTML(options.filename, options);

	// Generate text for non-html email clients
	const text = htmlToText.fromString(html);

	// Mail options needed for sending the mail
	const mailOptions = {
		from: `Some App <some.app@example.com>`,
		to: options.user.email,
		subject: options.subject,
		html,
		text
	};

	// Promisify callback-based sendMail function
	const sendMail = promisify(
		transport.sendMail.bind(transport)
	);

	// Finally, send the email!
	return sendMail(mailOptions);
};
