const mongoose = require('mongoose');
const winston = require('winston');

async function mongoConnection() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to DB")
    } catch (err) {
        winston.log("db error", "Something is wrong with DB")
    }
   await mongoose.connect(process.env.DB_CONNECT);
}

module.exports = mongoConnection;