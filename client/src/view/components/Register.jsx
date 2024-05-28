import React, { useReducer } from "react";
import {
  Button,
  TextInput,
  Form,
  FormGroup,
  Grid,
  Row,
  Column,
} from "@carbon/react";
import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";

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
    <Grid>
      <Column lg={16} md={8} sm={12}>
        <Form onSubmit={handleSubmit}>
          <TextInput
            id="username"
            labelText="Username"
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
            required
          />
          <TextInput
            id="email"
            labelText="Email"
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            required
          />
          <TextInput
            id="password"
            labelText="Password"
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            required
          />
          <Button type="submit">Register</Button>
        </Form>
      </Column>
    </Grid>
  );
};

export default Register;
