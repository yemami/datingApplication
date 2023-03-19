const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, name, dateOfBirth, gender} = req.body;
    // Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists in database with this email',
      });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      dateOfBirth,
      gender,
   
    });
    // Return success response with token
    res.status(201).json({
       success: true,
        message: 'User successfully created in database',
       });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password please try again',
      });
    }
 
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password please try again',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.JWT_SECRET,
    );

    // Return success response with token
    res.status(200).json({
       success: true,
        message: 'User successfully logged in',
        token, user});
  } catch (error) {
    next(error);
  }
};





