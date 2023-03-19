const Message = require('../models/Message');

// Get all chats for the logged in user
exports.getAllChats = async (req, res, next) => {
  try {
    const userId = req.user_id;
    const chats = await Message.aggregate([ 
      { $match: { $or: [{ senderId: userId }, { recipientId: userId }] } },
      { $sort: { timestamp: -1 } }
    ]);
    res.status(200).json({
      success: true,
      data: chats
    });
  } catch (error) {
    next(error);
  }
};


    

// Get all messages between two users
exports.getMessages = async (req, res, next) => {
  try {
    const { userId, recipientId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: recipientId },
        { senderId: recipientId, recipientId: userId }
      ]
    }).sort({ timestamp: 1 }).populate('senderId recipientId', 'name');

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create a new message
exports.sendMessage = async (req, res, next) => {
  try {
    const { userId, recipientId, message } = req.body;

    const newMessage = new Message({
      senderId: userId,
      recipientId,
      message
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};