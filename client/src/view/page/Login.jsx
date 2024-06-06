// Login.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  TextInput,
  Tile,
  PasswordInput,
  Button,
  Stack,
  ButtonSet,
  Form,
} from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({
        username,
        password,
      });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleUsername = async (e) => {
    setError("");
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  return (
    <main className="login-page">
      <Tile className="login-container">
        <img className="logo" src="logo.png" />
        <Form>
          <Stack gap={8}>
            <h2>Login</h2>
            <TextInput
              maxCount={255}
              invalidText="El texto es demasiado largo..."
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              labelText="Nombre de usuario"
              value={username}
              onChange={handleUsername}
            />
            <PasswordInput
              id="password"
              type="password"
              labelText="Contraseña"
              placeholder="Contraseña"
              value={password}
              onChange={handlePassword}
            />
            <p className="login-error">{error}</p>
            <section className="button--section">
              <Button
                size="2xl"
                kind="secondary"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </Button>
              <Button
                size="2xl"
                renderIcon={ArrowRight}
                onClick={handleLogin}
                type="submit"
              >
                Entrar
              </Button>
            </section>
          </Stack>
        </Form>
      </Tile>
    </main>
  );
};

export default Login;
