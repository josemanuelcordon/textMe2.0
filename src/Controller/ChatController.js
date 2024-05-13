import ChatService from "../Service/ChatService.js";

const getUserChats = async (req, res) => {
  const userId = req.params.userId;

  const chats = await ChatService.getUserChats(userId);
  res.status(200).json(chats);
};

export default {
  getUserChats,
};
