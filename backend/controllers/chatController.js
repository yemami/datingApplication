const Message = require("../models/Message");

// Get all chats for the logged in user
exports.getAllChats = async (req, res, next) => {
  try {
    const userId = req.userId;
    const messages = await Message.find({
      $or: [{ "sender._id": userId }, { "recipient._id": userId }],
    }).sort({ timestamp: -1 });

    const transformedMessages = messages.map((message) => {
      return {
        id: message._id,
        recipient: message.recipient.name,
        recipientId: message.recipient._id,
        sender: message.sender.name,
        senderId: message.sender._id,
        message: message.messages[message.messages.length - 1].text,
        timestamp: message.timestamp,
      };
    });

    res.status(200).json({
      success: true,
      data: transformedMessages,
    });
  } catch (error) {
    next(error);
  }
};

// Get all messages for a specific chat
exports.getChatMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.findOne({
      _id: chatId,
    }).sort({ timestamp: -1 });
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new message
exports.sendMessage = async (req, res, next) => {
  //send a message to a specific chat
  try {
    const { chatId } = req.params;
    const messages = await Message.updateOne(
      { _id: chatId },
      { $push: { messages: { text: req.body.text, sender: req.userId } } }
    );
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
