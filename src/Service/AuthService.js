import UserRepository from "../Repository/sql/UserSqlRepository.js";

const getUser = async (telephone, password) => {
  const user = await UserRepository.getUser(telephone, password);
  return user;
};

export default { getUser };
