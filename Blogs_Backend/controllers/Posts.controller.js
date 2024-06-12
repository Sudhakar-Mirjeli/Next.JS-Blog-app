const PostService = require('../services/Posts.service');
const logger = require('../utilities/logger');

/**
 * @method PostController:postBlog
 * @description Adds a new blog
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding blog
*/
async function postBlog(req, res) {
    try {
        logger.info('Inside PostController: postBlog method')
        if (!req.body) throw new Error('please provide required data.')
        const response = await PostService.postBlog(req.body, req.user);
        if (!response)
            throw new Error('Error! Please try after some time.')
        return res.status(201).json(response);
    } catch (error) {
        logger.error(`Inside PostController: postBlog method: Error while adding new blog, ${error}`);
    };
}

/**
 * @method PostController:fetchAllBlogs
 * @description fetch all blogs
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after fetching blogs
*/
async function fetchAllBlogs(req, res) {
    try {
        logger.info('Inside PostController: fetchAllBlogs method')
        const response = await PostService.fetchAllBlogs(req.query);
        if (!response)
            throw new Error('Error! Please try after some time.')
        return res.status(200).json(response);
    } catch (error) {
        logger.error(`Inside PostController: fetchAllBlogs method: Error while fetching blog posts, ${error}`);
    };
}

module.exports = {
    postBlog,
    fetchAllBlogs
}