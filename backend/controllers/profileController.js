const { profileUpload } = require('../middleware/uploadMiddleware');

module.exports.uploadProfilePicture = (req, res, next) => {
  profileUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }

    // Store the path to the uploaded profile picture in the user's profile picture field
    req.user.profilePicture = `/uploads/profile/${req.file.filename}`;
    req.user.save();

    res.status(200).json({
      success: true,
      data: {
        message: 'Profile picture uploaded successfully',
        imageUrl: req.user.profilePicture,
      },
    });
  });
};

