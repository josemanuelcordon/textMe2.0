import React, { useReducer, useState } from "react";
import {
  Button,
  TextInput,
  Form,
  PasswordInput,
  Tile,
  Stack,
} from "@carbon/react";
import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@carbon/icons-react";

// Estado inicial del formulario
const initialState = {
  username: "",
  email: "",
  password: "",
  errors: {
    username: "",
    email: "",
    password: "",
  },
};

// Función reducer para manejar cambios en el formulario
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
        errors: { ...state.errors, username: action.error },
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
        errors: { ...state.errors, email: action.error },
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        errors: { ...state.errors, password: action.error },
      };
    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (type) => (e) => {
    const value = e.target.value;
    let error = "";

    if (value.length > 255) {
      error = "El campo no puede ser tan largo";
    }

    dispatch({ type, payload: value, error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.createUser(state.username, state.email, state.password);
      navigate("/login");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="login-page">
      <Tile className="login-container">
        <img className="logo" src="logo.png" alt="Logo" />
        <Form onSubmit={handleSubmit}>
          <Stack gap={8}>
            <h2>Registro</h2>
            <TextInput
              id="username"
              labelText="Username"
              value={state.username}
              onChange={handleChange("SET_USERNAME")}
              required
              invalid={!!state.errors.username}
              invalidText={state.errors.username}
            />
            <TextInput
              id="email"
              labelText="Email"
              type="email"
              value={state.email}
              onChange={handleChange("SET_EMAIL")}
              required
              invalid={!!state.errors.email}
              invalidText={state.errors.email}
            />
            <PasswordInput
              id="password"
              type="password"
              labelText="Contraseña"
              placeholder="Contraseña"
              value={state.password}
              onChange={handleChange("SET_PASSWORD")}
              required
              invalid={!!state.errors.password}
              invalidText={state.errors.password}
            />
            <p className="login-error">{error}</p>
            <section className="button--section">
              <Button
                size="2xl"
                kind="secondary"
                onClick={() => navigate("/login")}
              >
                Volver
              </Button>
              <Button size="2xl" renderIcon={ArrowRight} type="submit">
                Registrarse
              </Button>
            </section>
          </Stack>
        </Form>
      </Tile>
    </main>
  );
};

export default Register;
