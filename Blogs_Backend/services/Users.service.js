const UserModel = require('../models/Users.model');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utilities/logger');

/**
* @method UserService:addNewUser
* @description addig new user to database
* @returns {Object} Object with the status, message
*/
async function addNewUser(userRQ) {
    try {
        logger.info('Inside UserService: addNewUser method')

        // Check if the user already exists
        const doesUserExist = await UserModel.findOne({ email: userRQ.email.toLowerCase().trim() });

        if (doesUserExist) {
            return { status: false, message: 'User already exists.' };
        }

        // Hashing the password before saving.
        const saltRounds = 10; // The number of salt rounds
        const hashedPassword = await bcrypt.hash(userRQ.password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new UserModel({
            email: userRQ.email,
            passwordHash: hashedPassword
        });
        await newUser.save();
        return {
            status: true,
            message: 'User registered successfully.'
        };

    } catch (error) {
        logger.error(`Inside UserService: addNewUser method: ${error}`)
        return { success: false, message: 'An error occurred during adding new user.', error: error };
    }
}


/**
* @method UserService:loginUser
* @description login user with valid credentials
* @returns {Object} Object with the status, message & token
*/
async function loginUser(userRQ) {
    try {
        logger.info('Inside UserService: loginUser method')

        const doesUserExist = await UserModel.findOne({ email: userRQ.email.toLowerCase().trim() });
        if (doesUserExist) {
            // Compare the hashed password with the provided password
            const isPasswordValid = await bcrypt.compare(userRQ.password, doesUserExist.passwordHash);

            if (!isPasswordValid) {
                return { status: false, message: 'Invalid password.' };
            }

            // Creating token with user data
            const payload = {
                userId: doesUserExist._id,
                email: doesUserExist.email
            };
            const token = jwt.sign(payload, config.SERVER.JWT_SECRET_KEY, { expiresIn: '1d' });
            return {
                status: true,
                token: token,
                message: 'login successfull.'
            }

        } else {
            return {
                status: false,
                message: 'please enter valid credentials'
            }
        }
    } catch (error) {
        logger.error(`Inside UserService: loginUser method: ${error}`)
        return {
            status: false,
            message: "Failed to login"
        };
    }
}

module.exports = {
    addNewUser,
    loginUser
}
