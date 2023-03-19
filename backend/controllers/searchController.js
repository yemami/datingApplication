const User = require('../models/User');

const getSuggestedMatches = async (req, res, next) => {
  try {
    // Get user's location from database
    const user_id = req.userId;
    const user = await User.findOne({ _id: user_id })

    // Find users within 1km of user's location
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: user.location,
          },
          $maxDistance: 1000,
        },
      },
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const likeUser = async (req, res, next) => {
  try { 
    // Get user's id from request
    const user_id = req.userId;
    const likedUser = req.params.user_id;
    const result = await User.updateOne({ _id: user_id }, { $push: { likedUsers: likedUser } });
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