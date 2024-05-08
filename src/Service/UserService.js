import UserRepository from "../Repository/sql/UserSqlRepository.js";

const getUsersByTelephone = async (telephone) => {
  return await UserRepository.getUsersByTelephone(telephone);
};

export default {
  getUsersByTelephone,
};
