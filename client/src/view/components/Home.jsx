// Home.js
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat";

const Home = () => {
  const { phone, logout } = useAuth();

  useEffect(() => {
    console.log(phone);
  }, [phone]);
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Home;
