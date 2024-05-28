import UserService from "../Service/UserService.js";

const getUsersByUsername = async (req, res) => {
  const username = req.query.name;

  const users = await UserService.getUsersByUsername(username);

  res.status(200).json(users);
};

const getUserFriends = async (req, res) => {
  const userId = req.params.userId;
  const friends = await UserService.getUserFriends(userId);

  res.status(200).json(friends);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserService.createUser(username, email, password);

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400).json({ error: "Nombre de usuario actualmente en uso" });
  }
};

export default {
  getUsersByUsername,
  getUserFriends,
  createUser,
};
