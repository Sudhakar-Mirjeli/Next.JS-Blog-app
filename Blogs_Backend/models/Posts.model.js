const mongoose = require('mongoose')

/* 
* Defining Post Model
*/
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel;