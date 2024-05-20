import UserService from "../Service/UserService.js";

const getUsersByTelephone = async (req, res) => {
  const username = req.query.name;

  const users = await UserService.getUsersByTelephone(username);

  res.status(200).json(users);
};

const getUserFriends = async (req, res) => {
  const userId = req.params.userId;
  console.log("HOLAAAAA", userId);
  const friends = await UserService.getUserFriends(userId);

  res.status(200).json(friends);
};

export default {
  getUsersByTelephone,
  getUserFriends,
};
