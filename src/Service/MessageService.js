import { MessageRepository } from "../Repository/index.js";

const saveMessage = async (sender, content, date, chat) => {
  const message = {
    sender: sender,
    content: content,
    date: date,
    chat: chat,
  };

  return await MessageRepository.saveMessage(message);
};

const getChatMessages = async (chatId) => {
  const messages = await MessageRepository.getChatMessages(chatId);
  return messages;
};

const getMessageInfoByChat = async (chatId, userId) => {
  const messageInfo = await MessageRepository.getMessageInfoByChat(
    chatId,
    userId
  );
  return messageInfo;
};

const readMessages = async (chatId, userId) => {
  await MessageRepository.readMessages(chatId, userId);
};

const deleteMessage = async (messageId) => {
  await MessageRepository.deleteMessage(messageId);
};

const updateMessage = async (messageId, content) => {
  return await MessageRepository.updateMessage(messageId, content);
};

export default {
  saveMessage,
  getChatMessages,
  getMessageInfoByChat,
  readMessages,
  deleteMessage,
  updateMessage,
};
