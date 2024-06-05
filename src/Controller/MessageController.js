import MessageService from "../Service/MessageService.js";

const saveMessage = async (req, res) => {
  const { sender, content, date, chat } = req.body;

  const messageCreated = await MessageService.saveMessage(
    sender,
    content,
    date,
    chat
  );
  console.log("MENSAJE CREADO:", messageCreated);
  res.status(200).json(messageCreated);
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

const deleteMessage = async (req, res) => {
  const messageId = req.params.messageId;
  await MessageService.deleteMessage(messageId);
  res.status(200).json({ deleted: true });
};

const updateMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const content = req.body.content;
  await MessageService.updateMessage(messageId, content);
  res.status(200).json({ updated: true });
};

export default {
  saveMessage,
  getChatMessages,
  readMessages,
  deleteMessage,
  updateMessage,
};
