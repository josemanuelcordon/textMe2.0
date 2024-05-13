import ChatRepository from "../repository/ChatRepository.js";

const getUserChats = async (userId) => {
  return await ChatRepository.getUserChats(userId);
};

export default {
  getUserChats,
};
