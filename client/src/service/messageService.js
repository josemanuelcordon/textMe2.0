import messageRepository from "../repository/messageRepository";

const sendMessage = async (message) => {
  await messageRepository.sendMessage(message);
};

const getChatMessages = async (chatId) => {
  return await messageRepository.getChatMessages(chatId);
};

export default {
  sendMessage,
  getChatMessages,
};
