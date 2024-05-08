import UserService from "../Service/UserService.js";

const getUsersByTelephone = async (req, res) => {
  const telephone = req.query.tel;

  const users = await UserService.getUsersByTelephone(telephone);

  res.status(200).json({ users: users });
};

export default {
  getUsersByTelephone,
};
