const express = require('express');
const { createUser, getAllUsers, updateUser } = require('../controller/user.controller');
const userRouter = express.Router();

userRouter.get("/all", getAllUsers)
userRouter.post("/create", createUser);
userRouter.put('/update', updateUser)

module.exports = { userRouter };