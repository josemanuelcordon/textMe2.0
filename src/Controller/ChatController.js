import ChatService from "../Service/ChatService.js";

const getUserChats = async (req, res) => {
  const userId = req.params.userId;

  const chats = await ChatService.getUserChats(userId);
  res.status(200).json(chats);
};

const createChat = async (req, res) => {
  const { sender, receiver, date } = req.body;
  const chat = await ChatService.createChat(sender, receiver, date);
  res.status(200).json(chat);
};

const createGroupChat = async (req, res) => {
  const { creator, members, name, date } = req.body;
  const chat = await ChatService.createGroupChat(creator, members, name, date);
  res.status(200).json(chat);
};

export default {
  getUserChats,
  createChat,
  createGroupChat,
};
