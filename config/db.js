// mongodb+srv://aman:<password>@cluster0.ro742kq.mongodb.net/
const mongoose = require('mongoose');

const connectDb = async() => {
    return await mongoose.connect('mongodb+srv://aman:aman@cluster0.ro742kq.mongodb.net/havahavai');
}

module.exports = {connectDb}