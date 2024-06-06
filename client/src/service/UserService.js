import UserRepository from "../repository/UserRepository";

const authUser = async (username, password) => {
  const user = await UserRepository.authUser(username, password);
  return user;
};

const getAllUsers = async () => {
  const users = await UserRepository.getAllUsers();
  return users;
};

const findUserByName = async (userName) => {
  const user = await UserRepository.findUserByName(userName);
  return user;
};

const getUserFriends = async (userId) => {
  const friends = await UserRepository.getUserFriends(userId);
  return friends.filter(
    (friend) => friend.active === 1 && friend.is_banned === 0
  );
};

const createUser = async (username, email, password) => {
  const user = await UserRepository.createUser(username, email, password);
  return user;
};

const enableAccount = (userId) => {
  return UserRepository.enableAccount(userId);
};

const unableAccount = (userId) => {
  return UserRepository.unableAccount(userId);
};

const banUser = (userId) => {
  return UserRepository.banUser(userId);
};

const disbanUser = (userId) => {
  return UserRepository.disbanUser(userId);
};

export default {
  authUser,
  getAllUsers,
  findUserByName,
  getUserFriends,
  createUser,
  enableAccount,
  unableAccount,
  banUser,
  disbanUser,
};
