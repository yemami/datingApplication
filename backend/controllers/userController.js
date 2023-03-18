const bcrypt = require('bcrypt');//used to hash passwords
const jwt = require('jsonwebtoken');//used to create, sign, and verify tokens
const config = require('../config/config');//config file contains all tokens and other private info
const User = require('../models/User');//

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, age, gender, bio,likedUsers } = req.body;//req.body is the data that is sent from the frontend

    // Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists in database with this email' + email,
      });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      bio,
      likedUsers
    });

    // Save user to database and return saved user
    const user= await User.create(newUser);

    return res.status(201).json({
      success: true,
      message: 'User successfully created in database',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports. getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: 'Users successfully retrived from database',
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports. getUserById = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const result = await User.findById({ _id: user_id });
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'User not found in database with this id =' + user_id,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User successfully retrive with id = ' + user_id + ' from database',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const { name, email, password, age, gender, bio, likedUsers } = req.body;

    let user = await User.findById({_id:user_id});

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found in database with this id =' + user_id,
      });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.age = age;
    user.gender = gender;
    user.bio = bio;
    user.likedUsers = likedUsers;

    if (password) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Save user to database
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User successfully updated in database',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById({_id:user_id});

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found in database with this id =' + user_id,
      });
    }

    await user.remove();
    return res.status(200).json({
      success: true,
      message: 'User successfully deleted from database',
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

