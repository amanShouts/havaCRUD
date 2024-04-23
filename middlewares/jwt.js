var jwt = require('jsonwebtoken');

const JWT_PRIVATE_KEY = 'wewewewrqwrqxcxzcxzcdcdicjizxncivndoidsnv'

const generateAuthToken = (username, email, name) => {
    // const {username, email, name, age} = req.body;
    const user = {
        email,
        name
    }
    const token = jwt.sign( user, JWT_PRIVATE_KEY, { algorithm: 'RS256' });
    console.log(token, " token from JWT")
    return token;
}

const verifyAuth = (req, res, next) => {
    
    next();
}