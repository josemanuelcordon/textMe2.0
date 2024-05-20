import MessageService from "../Service/MessageService.js";

const saveMessage = async (req, res) => {
  const { sender, content, date, chat } = req.body;

  const messageCreated = await MessageService.saveMessage(
    sender,
    content,
    date,
    chat
  );
  res.status(200).json({ created: true });
};

const getChatMessages = async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.params.userId;

  const messages = await MessageService.getChatMessages(chatId, userId);
  if (messages.length > 0) {
    res.status(200).json(messages);
  } else {
    res.status(200).json([]);
  }
};

const readMessages = async (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.params.userId;
  await MessageService.readMessages(chatId, userId);
  res.status(200).json([]);
};

export default {
  saveMessage,
  getChatMessages,
  readMessages,
};
