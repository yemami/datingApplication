const bcrypt = require('bcrypt');//used to hash passwords
const User = require('../models/User');//

module.exports.getUserById = async (req, res, next) => {
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

module.exports.updateCurrentUser = async (req, res, next) => {
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

module.exports.deleteCurrentUser = async (req, res, next) => {
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

