const UserService = require('../services/Users.service');
const logger = require('../utilities/logger');

/**
 * @method UserController:createNewUser
 * @description Adds a new user
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding user.
*/
async function createNewUser(req, res) {
    try {
        logger.info('Inside UserController: createNewUser method')
        if (!req.body) throw new Error('please provide required data.')
        const response = await UserService.addNewUser(req.body)
        if (!response)
            throw new Error('Error! Please try after some time.')
        return res.status(201).json(response);
    } catch (error) {
        logger.error(`Inside UserController: createNewUser method: Error while adding new user, ${error}`);
    };
}

/**
 * @method UserController:loginUser
 * @description login user with valid credentials
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after login
*/
async function loginUser(req, res) {
    try {
        logger.info('Inside UserController: loginUser method')
        if (!req.body) throw new Error('please provide required data.')
        const response = await UserService.loginUser(req.body)
        if (!response)
            throw new Error('Error! Please try after some time.')
        return res.status(200).json(response);
    } catch (error) {
        logger.error(`Inside UserController: loginUser method: Error while login user, ${error}`);
    };
}

module.exports = {
    createNewUser,
    loginUser
}