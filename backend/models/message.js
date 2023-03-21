const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  recipient: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  messages: [{ text: String, sender: mongoose.Schema.Types.ObjectId }],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
