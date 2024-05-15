import UserRepository from "../Repository/sql/UserSqlRepository.js";

const getUsersByTelephone = async (telephone) => {
  return await UserRepository.getUsersByTelephone(telephone);
};

const getUserIdsByChat = async (chatId) => {
  return (await UserRepository.getUserIdsByChat(chatId)) ?? [];
};

const getUserInfoByChat = async (chatId, userId) => {
  return await UserRepository.getUserInfoByChat(chatId, userId);
};

export default {
  getUsersByTelephone,
  getUserIdsByChat,
  getUserInfoByChat,
};
