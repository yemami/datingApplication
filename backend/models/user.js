const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
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
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    likedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;