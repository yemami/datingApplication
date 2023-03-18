const User = require('../models/User');

const searchUsers = async (req, res, next) => {
  try {
    const { gender, minAge, maxAge } = req.query;

    // Build query based on filters
    const query = {
      gender: { $eq: gender },
      age: { $gte: minAge, $lte: maxAge },
    };

    // Execute query and get matching users
    const matchingUsers = await User.find(query);

    // Send matching users as response
    res.status(200).json({
      success: true,
      data: matchingUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchUsers,
};