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

  const messages = await MessageService.getChatMessages(chatId);
  console.log(messages);
  if (messages.length > 0) {
    res.status(200).json(messages);
  } else {
    res.status(200).json([]);
  }
};

export default {
  saveMessage,
  getChatMessages,
};
