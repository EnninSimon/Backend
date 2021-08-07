const express = require('express');
const { body } = require('express-validator');
const userModel = require('../modules/user');
const router = express.Router();

const { singupController, signinController } = require('../controllers/user');

router.put('/signup', [
    body('name').trim().not().isEmpty().withMessage('User name is required!'),
    body('email')
        .isEmail()
        .withMessage('Email is invalid!')
        .custom((value, { req }) => {
            //Check if email is already taken
            return userModel.findOne({ email: value }).then(userDoc => {
                if (userDoc)
                    return Promise.reject("Email already taken");

            });
        }),
    body('password').trim().isLength({ min: 5 })

], singupController);

router.post('/signin', [
    body('email')
        .isEmail()
        .withMessage('Email is invalid!'),
    body('password').trim().isLength({ min: 5 })
], signinController);



module.exports = router;