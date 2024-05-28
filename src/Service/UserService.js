import UserRepository from "../Repository/sql/UserSqlRepository.js";

const getUsersByUsername = async (username) => {
  return await UserRepository.getUsersByUsername(username);
};

const getUserIdsByChat = async (chatId) => {
  return (await UserRepository.getUserIdsByChat(chatId)) ?? [];
};

const getUserInfoByChat = async (chatId, userId) => {
  return await UserRepository.getUserInfoByChat(chatId, userId);
};

const getUserFriends = async (userId) => {
  return await UserRepository.getUserFriends(userId);
};

const getChatParticipantsExceptMe = async (chatId, userId) => {
  return await UserRepository.getChatParticipantsExceptMe(chatId, userId);
};

const createUser = async (username, email, password) => {
  return await UserRepository.createUser(username, email, password);
};

export default {
  getUsersByUsername,
  getUserIdsByChat,
  getUserInfoByChat,
  getUserFriends,
  getChatParticipantsExceptMe,
  createUser,
};
