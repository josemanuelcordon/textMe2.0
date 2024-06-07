import UserService from "../Service/UserService.js";

const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(users);
};

const getUsersByUsername = async (req, res) => {
  let username = req.query.name;

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

const enableAccount = async (req, res) => {
  const userId = req.params.userId;
  await UserService.enableAccount(userId);
  res.status(200).end();
};

const unableAccount = async (req, res) => {
  const userId = req.params.userId;
  await UserService.unableAccount(userId);
  res.status(200).end();
};

const banUser = async (req, res) => {
  const userId = req.params.userId;
  await UserService.banUser(userId);
  res.status(200).end();
};

const disbanUser = async (req, res) => {
  const userId = req.params.userId;
  await UserService.disbanUser(userId);
  res.status(200).end();
};

export default {
  getAllUsers,
  getUsersByUsername,
  getUserFriends,
  createUser,
  enableAccount,
  unableAccount,
  banUser,
  disbanUser,
};
