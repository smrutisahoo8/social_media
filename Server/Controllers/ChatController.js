import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
  const chat = await ChatModel.findOne({ senderId: req.body.senderId });
  if (chat) {
    try {
      const result = await ChatModel.findOneAndUpdate(
        { senderId: req.body.senderId },
        { $push: { members: req.body.receiverId } }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    const newChat = new ChatModel({
      senderId: req.body.senderId,
      members: [req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const deleteChat = async (req, res) => {
  try {
    const results = await ChatModel.findOne(
      { senderId: req.body.senderId },
      { $pull: { "members": req.body.receiverId } }
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({
      senderId: req.params.userId,
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
