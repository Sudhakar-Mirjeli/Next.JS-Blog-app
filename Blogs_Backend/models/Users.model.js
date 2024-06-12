const mongoose = require('mongoose')

/* 
* Defining User Model
*/
const userSchema = new mongoose.Schema({
    email: {
		type: String,
		max: 50,
		lowercase: true,
		trim: true,
		match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
	},
    passwordHash: {
        type: String,
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;