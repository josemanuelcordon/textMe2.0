import UserRepository from "../Repository/sql/UserSqlRepository.js";

const getUser = async (username, password) => {
  const user = await UserRepository.getUser(username, password);
  return user;
};

export default { getUser };
