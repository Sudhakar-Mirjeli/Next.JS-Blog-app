const PostModel = require('../models/Posts.model');
const logger = require('../utilities/logger');

/**
 * @method PostService:postBlog
 * @description Adds a new blog
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after adding blog
*/
async function postBlog(blogPayload, loginUser) {
    try {
        logger.info('Inside PostService: postBlog method')
        if (!blogPayload) throw new Error('please provide required data.')
        let payload = {
            title: blogPayload.title,
            content: blogPayload.content,
            authorId: loginUser._id
        }
        const data = new PostModel(payload)
        await data.save();
        return {
            status: true,
            message: 'Post added successfully.'
        }
    } catch (error) {
        logger.error(`Inside PostService: postBlog method: Error while adding new blog, ${error}`);
    };
}

/**
 * @method PostService:fetchAllBlogs
 * @description fetch all blogs
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @returns Returns a successful response after fetching blogs
*/
async function fetchAllBlogs(query) {
    try {
        logger.info('Inside PostService: fetchAllBlogs method');
        let findObj = {}
        // find blogs for specific author
        if (query.author)
            findObj['authorId'] = query.author;
        const blogs = await PostModel.find(findObj)
        return {
            status: true,
            blogs: blogs,
            message: 'Blogs retrieved successfully.'
        }
    } catch (error) {
        logger.error(`Inside PostService: fetchAllBlogs method: Error while fetching blog posts, ${error}`);
    };
}

module.exports = {
    postBlog,
    fetchAllBlogs
}