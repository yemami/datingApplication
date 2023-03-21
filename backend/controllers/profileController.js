const User = require("../models/User");
const path = require("path");
const fs = require("fs");

exports.uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Check if the file object contains a path property
    if (!req.file.path) {
      return res.status(400).send({ message: "Uploaded file has no path" });
    }
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profile.profilePic) {
      // delete existing profile pic
      const oldPicPath = path.join(__dirname, user.profile.profilePic);
      if (fs.existsSync(oldPicPath)) {
        fs.unlinkSync(oldPicPath);
      }
    }

    user.profile.profilePic = req.file.path;
    await user.save();

    res.json({ message: "Profile pic uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
