const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, name, age, gender, bio ,likedUsers} = req.body;

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
    const user = new User({
      email,
      password: hashedPassword,
      name,
      age,
      gender,
      bio,
      likedUsers,
    });

    // Save user to database
    const savedUser = await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Return success response with token
    res.status(201).json({
       success: true,
        message: 'User successfully created in database',
        token });
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
        error: 'Invalid email or password',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Return success response with token
    res.status(200).json({
       success: true,
        message: 'User successfully logged in',
        token });
  } catch (error) {
    next(error);
  }
};

