const express = require('express');
const router = express.Router();
const passport = require('passport');

const { catchErrors } = require('../handlers/errorHandler');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const mailController = require('../controllers/mailController');

/* 
    Root route -- currently just for testing
*/
router.get('/', (req, res) => {
	res.send('It works, yo!');
});

/*
    Email routes
*/
router.get(
	'/email',
	passport.authenticate('jwt', { session: false }),
	catchErrors(mailController.sendMail)
);

/*
    User routes
*/
router.post(
	'/register',
	userController.validateRegister,
	catchErrors(userController.registerUser)
);

router.get(
	'/users/me',
	passport.authenticate('jwt', { session: false }),
	catchErrors(userController.getMe)
);

router.post(
	'/users/me',
	passport.authenticate('jwt', { session: false }),
	catchErrors(userController.updateMe)
);

router.delete(
	'/users/me',
	passport.authenticate('jwt', { session: false }),
	catchErrors(userController.deleteMe)
);

/*
    Auth routes
*/
router.post(
	'/login',
	passport.authenticate('local'),
	authController.login
);

router.get('/logout', authController.logout);

module.exports = router;
