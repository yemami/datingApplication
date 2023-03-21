const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    profilePic: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: [Number, Number], // [longitude, latitude]
    },
    interests: [String],
    likedUsers: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        age: Number,
        bio: String,
        location: String,
        profilePic: String,
      },
    ],
    viewedUsers: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        age: Number,
        bio: String,
        location: String,
        profilePic: String,
      },
    ],
    matchedUsers: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        age: Number,
        bio: String,
        location: String,
        profilePic: String,
      },
    ],
  },
});
userSchema.index({ "profile.location": "2d" });
const User = mongoose.model("User", userSchema);
module.exports = User;
