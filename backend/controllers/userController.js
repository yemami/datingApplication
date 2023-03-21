const bcrypt = require("bcrypt"); //used to hash passwords
const User = require("../models/User"); //

module.exports.getUserDetails = async (req, res, next) => {
  try {
    const user_id = req.userId;
    const result = await User.findOne(
      { _id: user_id },
      { dateOfBirth: 1, profile: 1, gender: 1, email: 1, name: 1 }
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        error: "User not found in database with this id =" + user_id,
      });
    }
    // transform user data to destrcuture profile
    // change date format
    const data = {
      ...result._doc,
      profilePic: result.profile.profilePic ? result.profile.profilePic : "",
      bio: result.profile.bio ? result.profile.bio : "",
      location: result.profile.location,
      interests: result.profile.interests,
      dateOfBirth: result.dateOfBirth.toISOString().split("T")[0],
    };
    delete data.profile;
    return res.status(200).json({
      success: true,
      message:
        "User successfully retrive with id = " + user_id + " from database",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateCurrentUser = async (req, res, next) => {
  try {
    const user_id = req.userId;
    let user = await User.findOne({ _id: user_id });

    // Save user to database
    const user_data = req.body;

    const updatedUser = await User.updateOne({ _id: user_id }, user_data);

    return res.status(200).json({
      success: true,
      message: "User successfully updated in database",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
