// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import UserRepository from "../../repository/UserRepository";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phone, setPhone] = useState();

  const login = async (userData) => {
    const access = await UserRepository.authUser(
      userData.telephone,
      userData.password
    );
    if (access) setPhone(userData);
  };

  const logout = () => {
    setPhone(null);
  };

  return (
    <AuthContext.Provider value={{ phone, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
