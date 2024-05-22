import UserRepository from "../Repository/sql/UserSqlRepository.js";

const getUsersByTelephone = async (username) => {
  return await UserRepository.getUsersByTelephone(username);
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

export default {
  getUsersByTelephone,
  getUserIdsByChat,
  getUserInfoByChat,
  getUserFriends,
  getChatParticipantsExceptMe,
};
