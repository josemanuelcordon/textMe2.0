import UserRepository from "../repository/UserRepository";

const authUser = async (username, password) => {
  const user = await UserRepository.authUser(username, password);
  return user;
};

const findUserByName = async (userName) => {
  const user = await UserRepository.findUserByName(userName);
  return user;
};

const getUserFriends = async (userId) => {
  const friends = await UserRepository.getUserFriends(userId);
  console.log(friends);
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

export default {
  authUser,
  findUserByName,
  getUserFriends,
  createUser,
  enableAccount,
  unableAccount,
};
