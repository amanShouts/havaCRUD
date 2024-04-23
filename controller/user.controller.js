const fs = require('fs');
const { User } = require('../model/userModel');
const { userJSchema } = require('../validators/userValidation');
const { generateAuthToken } = require('../middlewares/jwt');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
  const { username, age, email, name, password } = req.body;
  const { value, error } = await userJSchema.validate({ username, name, age, email, password });

  if (error) {
    console.log("Error in Joi Validation -> ", error);
    return res.status(400).json({ 'msg': 'Data mismatch or Incorrect' });
  }

  // check if entry with same email id is already there 
  const existingUser = await User.find({ email: email })
  if (existingUser.length > 0) {
    return res.status(409).json({ msg: 'User already Exists' });
  }

  try {
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const user = await User.create({ username, name, age, email, createdAt: new Date(), password: hashPassword })

    if (user) {
      return res.status(200).json({ msg: "User created successfully", data: user });
    }
    else {
      return res.status(500).json({ msg: 'User creation Failed!' });
    }
  }
  catch (error) {
    console.log("Error -> ", error)
    return res.status(500).json({ msg: 'User creation Failed!' });
  }
}

const getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find({}).lean({});
    const cleanData = users.map((user) => (
      {
        username: user.username,
        name: user.name,
        email: user.email,
        age: user.age
      }
    ));
    res.status(200).json({ msg: 'Success', data: cleanData })
  }
  catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
}

const getUser = async (req, res, next) => {
  const user = req.user;
  try {
    const users = await User.find({ email : user.email  });
    const user = users[0]
    const cleanData = {
      username: user.username,
      name: user.name,
      email: user.email,
      age: user.age
    }
    res.status(200).json({ msg: 'Success', data: cleanData })
  }
  catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
}

const updateUser = async (req, res, next) => {
  const user = req.user;
  const {name, age} = req.body;
  try{
    const result = await User.findOneAndUpdate({email : user.email}, {name : name, age : age}, {new : true})
      .select({password : 0, __v : 0, _id : 0, createdAt : 0});
    if(result){
      res.status(200).json({msg : 'Update Success', data : result})
    }
  }
  catch(error){
    res.status(500).json({msg : 'Server Error',})
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password are correct and then send back a token to the client 
  try {
    const userArr = await User.find({ email, email });
    if (userArr.length == 0) {
      return res.status(401).json({ msg: 'Invalid User Credentials' })
    }
    const user = userArr[0];
    const result = bcrypt.compareSync(password, user.password); // true
    const token = generateAuthToken(email, password, user.username, user.name);
    res.status(200).json({ msg: 'Login success', data: { token } })
  }
  catch (error) {
    res.status(500);
    console.log(error)
  }
}

module.exports = { createUser, getAllUsers, updateUser, login, getUser }
