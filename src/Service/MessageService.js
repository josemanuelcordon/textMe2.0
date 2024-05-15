import messageRepository from "../Repository/sql/MessageSqlRepository.js";

const saveMessage = async (sender, content, date, chat) => {
  const message = {
    sender: sender,
    content: content,
    date: date,
    chat: chat,
  };

  await messageRepository.saveMessage(message);
};

const getChatMessages = (chatId) => {
  const messages = messageRepository.getChatMessages(chatId);
  return messages;
};

const getMessageInfoByChat = async (chatId) => {
  const messageInfo = await messageRepository.getMessageInfoByChat(chatId);
  return messageInfo;
};

const readMessages = async (chatId, userId) => {
  messageRepository.readMessages(chatId, userId);
};

export default {
  saveMessage,
  getChatMessages,
  getMessageInfoByChat,
  readMessages,
};
