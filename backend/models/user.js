const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      profilePic: { 
        type: String,
      },
      bio: {
        type: String,
      },
      location: [Number],
      interests: [String],
      likedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
      }],
      viewedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
      }],
      matchedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
      }]
    },

  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;