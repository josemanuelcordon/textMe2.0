import ChatRepository from "../Repository/sql/ChatSqlRepository.js";

const getUserChats = async (userId) => {
  return await ChatRepository.getUserChats(userId);
};

export default {
  getUserChats,
};
