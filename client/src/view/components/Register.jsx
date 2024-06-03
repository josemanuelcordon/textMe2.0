import React, { useReducer } from "react";
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
};

// Función reducer para manejar cambios en el formulario
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.createUser(state.username, state.email, state.password);
      navigate("/login");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <main className="login-page">
      <Tile className="login-container">
        <img className="logo" src="logo.png" />
        <Form onSubmit={handleSubmit}>
          <Stack gap={8}>
            <h2>Registro</h2>
            <TextInput
              maxCount={255}
              invalidText="El texto es demasiado largo..."
              id="username"
              labelText="Username"
              value={state.username}
              onChange={(e) =>
                dispatch({ type: "SET_USERNAME", payload: e.target.value })
              }
              required
            />
            <TextInput
              maxCount={255}
              invalidText="El texto es demasiado largo..."
              id="email"
              labelText="Email"
              type="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              required
            />
            <PasswordInput
              id="password"
              type="password"
              labelText="Contraseña"
              placeholder="Contraseña"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              required
            />
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
