// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import UserService from "../../service/UserService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = async (userData) => {
    const userLogin = await UserService.authUser(
      userData.username,
      userData.password
    );

    if (userLogin.error) {
      throw new Error(userLogin.error);
    }
    setUser(userLogin);
  };

  const logout = () => {
    setUser(null);
  };

  const enableAccount = () => {
    setUser((prev) => {
      return { ...prev, active: 1 };
    });
  };

  const unableAccount = () => {
    setUser((prev) => {
      return { ...prev, active: 0 };
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, enableAccount, unableAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
