// Home.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat";

const Home = () => {
  const { phone, logout } = useAuth();

  return (
    <div>
      <h2>Welcome, {phone ? phone : "Guest"}</h2>
      {phone && <button onClick={logout}>Logout</button>}
      <Chat />
    </div>
  );
};

export default Home;
