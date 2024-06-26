import { UserRepository } from "../Repository/index.js";

const getAllUsers = async () => {
  return await UserRepository.getAllUsers();
};

const getUsersByUsername = async (username) => {
  return await UserRepository.getUsersByUsername(username);
};

const getUsernameById = async (userId) => {
  return await UserRepository.getUsernameById(userId);
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

const createUser = async (userEntity) => {
  return await UserRepository.createUser(userEntity);
};

const enableAccount = async (userId) => {
  return await UserRepository.enableAccount(userId);
};

const unableAccount = async (userId) => {
  return await UserRepository.unableAccount(userId);
};

const banUser = async (userId) => {
  return await UserRepository.banUser(userId);
};

const disbanUser = async (userId) => {
  return await UserRepository.disbanUser(userId);
};

export default {
  getAllUsers,
  getUsersByUsername,
  getUsernameById,
  getUserIdsByChat,
  getUserInfoByChat,
  getUserFriends,
  getChatParticipantsExceptMe,
  createUser,
  enableAccount,
  unableAccount,
  banUser,
  disbanUser,
};
