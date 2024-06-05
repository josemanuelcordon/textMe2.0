import AuthService from "../Service/AuthService.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await AuthService.getUser(username, password);

  if (user) {
    if (user.is_banned) {
      res.status(401).json({ error: "Usuario baneado" });
      return;
    }
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

export default {
  login,
};
