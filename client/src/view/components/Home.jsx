// Home.js
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat";
import ChatList from "./ChatList";

const Home = () => {
  const { phone, logout } = useAuth();

  return (
    <div style={{ display: "flex" }}>
      <ChatList />
      <Chat />
    </div>
  );
};

export default Home;
