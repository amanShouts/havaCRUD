var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

const generateAuthToken = ( email, password, username, name) => {
    const user = {
        email,
        password,
        username,
        name
    }
    const token = jwt.sign( user, JWT_SECRET);
    return token;
}

const verifyAuth = (req, res, next) => {
    const bearer = req.headers['authorization'];
    const token = bearer.split(" ")[1];
    var user = jwt.verify(token, JWT_SECRET);
    if(user){
        req.user = user;
        next();
    }
    else
        return res.status(401).json({msg : 'Action/User Not Authorized'})
}

module.exports = {verifyAuth , generateAuthToken}