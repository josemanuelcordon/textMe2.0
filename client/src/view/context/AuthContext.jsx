// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import UserRepository from "../../repository/UserRepository";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async (userData) => {
    const userLogin = await UserRepository.authUser(
      userData.username,
      userData.password
    );
    if (userLogin) setUser(userLogin);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
