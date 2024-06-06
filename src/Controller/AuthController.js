import crypto from "crypto";

import AuthService from "../Service/AuthService.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await AuthService.getUser(username, password);

  if (user) {
    if (user.is_banned) {
      res.status(401).json({ error: "Usuario baneado" });
      return;
    }

    // Crear un hash SHA-256 del nombre de usuario
    const hashedUsername = crypto
      .createHash("sha256")
      .update(username)
      .digest("hex");

    // Verificar si la solicitud es HTTPS
    const isHTTPS = req.protocol === "https";

    // Condicionar la creación de la cookie basándose en si la solicitud es HTTPS
    if (isHTTPS) {
      console.log("Es https?");
      res.cookie("auth_token", hashedUsername, {
        httpOnly: false,
        expires: new Date(Date.now() + 3600000),
      });
    }

    // Devolver el usuario en la respuesta
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

export default {
  login,
};
