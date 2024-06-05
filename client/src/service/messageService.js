import messageRepository from "../repository/messageRepository";

const sendMessage = async (message) => {
  return await messageRepository.sendMessage(message);
};

const getChatMessages = async (chatId, userId) => {
  return await messageRepository.getChatMessages(chatId, userId);
};

const readMessages = async (chatId, userId) => {
  await messageRepository.readMessages(chatId, userId);
};

const deleteMessage = async (messageId) => {
  await messageRepository.deleteMessage(messageId);
};

const updateMessage = async (messageId, content) => {
  return await messageRepository.updateMessage(messageId, content);
};

export default {
  sendMessage,
  getChatMessages,
  readMessages,
  deleteMessage,
  updateMessage,
};
