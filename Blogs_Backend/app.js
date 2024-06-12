const config = require('./config')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const routes = require('./routes/routes');

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!: server crashed');
});

//Connecting to MongoDB
mongoose.connect(config.DATA_BASE.MONGODB_URI, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.info(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
    console.info(` Data Base connection successful. `)
    console.info(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`)
})

mongoose.connection.on('error', (err) => {
    console.info(`***********************************`)
    console.info(` Failed to connect MongoDB. ${err} `)
    console.info(`*************************************`)
})

app.listen(config.SERVER.PORT, () => {
    console.info(`############################################`)
    console.info(` Server is running on ${config.SERVER.PORT} successfully. `)
    console.info(`############################################`)
})

module.exports = app;