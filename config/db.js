const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
const MONGO_ATLAS_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const connectDb = async() => {
    return await mongoose.connect(`${MONGO_ATLAS_CONNECTION_STRING}/havahavai`);
}

module.exports = {connectDb}