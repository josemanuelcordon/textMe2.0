import messageRepository from "../repository/messageRepository";

const sendMessage = async (message) => {
  await messageRepository.sendMessage(message);
};

const getChatMessages = async (chatId, userId) => {
  return await messageRepository.getChatMessages(chatId, userId);
};

const readMessages = async (chatId, userId) => {
  await messageRepository.readMessages(chatId, userId);
};

export default {
  sendMessage,
  getChatMessages,
  readMessages,
};
