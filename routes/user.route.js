const express = require('express');
const { createUser, getAllUsers, updateUser, login, getUser } = require('../controller/user.controller');
const { verifyAuth } = require('../middlewares/jwt');

const userRouter = express.Router();

// open routes
userRouter.post('/login' , login)
userRouter.post("/create", createUser);  // similar to signup

//autheticated routes 
userRouter.get("/all", verifyAuth, getAllUsers)
userRouter.get('/get', verifyAuth, getUser);
userRouter.patch('/update', verifyAuth, updateUser)


module.exports = { userRouter };