const mongoose = require('mongoose');

/**
 * Open connection to MongoDB database. 
 */
function connectDB() {
    mongoose
        .connect('mongodb://mongo_db:27017/mongo_database', {
            useNewUrlParser: true,
            "auth": { "authSource": "admin" },
            "user": "test_user",
            "pass": "test_password"
        })
        .then(() => {
            console.log('Mongodb connected....');
        })
        .catch(err => console.log(err.message));

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });
};

/**
 * Disconnect database. 
 */
function disconnectDB() {
    mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };