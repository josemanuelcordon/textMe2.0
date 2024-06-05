import messageRepository from "../Repository/sql/MessageSqlRepository.js";

const saveMessage = async (sender, content, date, chat) => {
  const message = {
    sender: sender,
    content: content,
    date: date,
    chat: chat,
  };

  return await messageRepository.saveMessage(message);
};

const getChatMessages = async (chatId) => {
  const messages = await messageRepository.getChatMessages(chatId);
  return messages;
};

const getMessageInfoByChat = async (chatId, userId) => {
  const messageInfo = await messageRepository.getMessageInfoByChat(
    chatId,
    userId
  );
  return messageInfo;
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
  saveMessage,
  getChatMessages,
  getMessageInfoByChat,
  readMessages,
  deleteMessage,
  updateMessage,
};
