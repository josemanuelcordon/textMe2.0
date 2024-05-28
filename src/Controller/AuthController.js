import AuthService from "../Service/AuthService.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await AuthService.getUser(username, password);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json();
  }
};

export default {
  login,
};
