import AuthService from "../Service/AuthService.js";

const login = async (req, res) => {
  const { telephone, password } = req.body;

  const user = await AuthService.getUser(telephone, password);
  console.log(user);
  if (user) {
    res.status(200).json({ access: true });
  } else {
    res.status(401).json({ access: false });
  }
};

export default {
  login,
};
