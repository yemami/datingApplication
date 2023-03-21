const User = require("../models/User");
const Message = require("../models/Message");
const config = require("../config/config");
const { getDistanceFromLatLonInKm, getAge } = require("../utility");

const getSuggestedMatches = async (req, res, next) => {
  try {
    // Get user's location from database
    const user_id = req.userId;
    const user = await User.findOne({ _id: user_id });
    // Find users within 10km of user's location
    const users = await User.find({
      "profile.location": {
        $near: user.profile.location > 0 ? user.location : [0, 0],
        // $maxDistance: 10000, // 10km
      },
      "profile.interests": { $in: user.profile.interests }, // Filter by interests
      // filter out liked users
      _id: { $nin: user.profile.likedUsers.map((user) => user._id) },
      //filter out current user
    }).where({ _id: { $ne: user_id } });

    const [latitude, longitude] = user.profile.location
      ? user.profile.location
      : [0, 0];
    // Format the results to match the desired output
    const formattedUsers = users.map((user) => {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        user.profile.location[1],
        user.profile.location[0]
      );
      return {
        _id: user._id,
        name: user.name,
        age: getAge(user.dateOfBirth),
        bio: user.profile.bio,
        location: `${distance.toFixed(1)} KM away`,
        profilePic: `${config.BASE_URL}${
          user.profile.profilePic.includes("\\")
            ? user.profile.profilePic.split("\\")[1]
            : "default.jpeg"
        }`,
      };
    });

    res.status(200).json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    next(error);
  }
};

const likeUser = async (req, res, next) => {
  try {
    // Get user's id from request
    const user_id = req.userId;
    const likedUser = req.body;
    //get user
    const user = await User.findOne({ _id: user_id });

    //update user's liked list
    const result = await User.updateOne(
      { _id: user_id },
      { $addToSet: { "profile.likedUsers": likedUser } }
    );

    // check if liked user has liked current user
    const likedUserDoc = await User.findOne({ _id: likedUser._id });
    const likedUserLikedUsers = likedUserDoc.profile.likedUsers;
    const isMatch = likedUserLikedUsers.some(
      (user) => user._id.toString() === user_id
    );

    // if matched create a new message between the two users
    if (isMatch) {
      const message = {
        sender: { _id: user_id, name: user.name },
        recipient: { _id: likedUser._id, name: likedUser.name },
        messages: [{ text: "You have a new match!", sender: user_id }],
      };
      await Message.create(message);
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSuggestedMatches,
  likeUser,
};
