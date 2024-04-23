const fs = require('fs');
const { User } = require('../model/userModel');
const { userJSchema } = require('../validators/userValidation');

const createUser = async (req, res) => {
  const { username, age, email, name, password } = req.body;
  console.log(username, name, age, email, password, " inside CREATE ROUTE");

  const {value ,error} = await userJSchema.validate({username, name, age, email, password});

  if(error){
    console.log("Error in Joi Validation -> ", error);
    return res.status(400).json({'msg' : 'Data mismatch or Incorrect' });
  }

  // check if entry with same email id is already there 
  const existingUser = await User.find({email : email})
  if(existingUser.length > 0){
    return res.status(409).json({msg : 'User already Exists'});
  }

  try {
    const user = await User.create({ username, name, age, email, createdAt : new Date() })

    if (user) {
      return res.status(200).json({ msg: "User created successfully", data: user });
    }
    else {
      return res.status(500).json({ msg : 'User creation Failed!' });
    }
  }
  catch(error){
    console.log("Error -> ", error)
    return res.status(500).json({ msg : 'User creation Failed!' });
  }
}

const getAllUsers = (req, res, next) => {

}

const updateUser = (req, res, next) => {

}

const login = (req, res, next) => {
  const {} = req.body;
}

module.exports = { createUser, getAllUsers, updateUser, login }
