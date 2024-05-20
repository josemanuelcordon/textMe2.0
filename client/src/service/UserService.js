import UserRepository from "../repository/UserRepository";

const findUserByName = async (userName) => {
  const user = await UserRepository.findUserByName(userName);
  return user;
};

const getUserFriends = async (userId) => {
  const friends = await UserRepository.getUserFriends(userId);
  return friends;
};

export default { findUserByName, getUserFriends };
