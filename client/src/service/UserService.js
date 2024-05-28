import UserRepository from "../repository/UserRepository";

const findUserByName = async (userName) => {
  const user = await UserRepository.findUserByName(userName);
  return user;
};

const getUserFriends = async (userId) => {
  const friends = await UserRepository.getUserFriends(userId);
  return friends;
};

const createUser = async (username, email, password) => {
  const user = await UserRepository.createUser(username, email, password);
  return user;
};

export default { findUserByName, getUserFriends, createUser };
