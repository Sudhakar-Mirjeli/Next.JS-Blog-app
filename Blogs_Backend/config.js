require('dotenv').config();
const assert = require('assert')

const { PORT, MONGODB_URI, JWT_SECRET_KEY } = process.env;

assert(PORT, 'PORT is required!')
assert(MONGODB_URI, 'Mongo URI is required!')


module.exports = {
    SERVER: {
        PORT: PORT,
        JWT_SECRET_KEY: JWT_SECRET_KEY
    },
    DATA_BASE: {
        MONGODB_URI: MONGODB_URI
    },

}