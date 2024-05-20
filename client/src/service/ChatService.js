import ChatRepository from "../repository/ChatRepository.js";

const getUserChats = async (userId) => {
  return await ChatRepository.getUserChats(userId);
};

const createChat = async (sender, receiver) => {
  return await ChatRepository.createChat(sender, receiver);
};

const createGroupChat = async (creator, members, groupName) => {
  return await ChatRepository.createGroupChat(creator, members, groupName);
};

export default {
  getUserChats,
  createChat,
  createGroupChat,
};
