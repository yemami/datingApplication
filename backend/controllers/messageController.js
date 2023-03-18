const Message = require('../models/Message');

// Create a new message between two users (sender and recipient)
module.exports.createMessage = async (req, res, next) => {
  try {
    const { senderId, recipientId, message } = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      message,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      success: true,
      message: savedMessage,
    });
  } catch (error) {
    next(error);
  }
};

// Get messages between two users (sender and recipient)
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { senderId, recipientId } = req.query;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, recipientId: recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).sort({ timestamp: 1 });// sort by timestamp in ascending order (oldest to newest)

    res.status(200).json({
      success: true,
      data:messages,
    });
  } catch (error) {
    next(error);
  }
};

