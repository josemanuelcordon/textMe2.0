// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import UserService from "../../service/UserService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  const login = async (userData) => {
    const passwordHash = await hashPassword(userData.password);
    const userLogin = await UserService.authUser(
      userData.username,
      passwordHash
    );

    if (userLogin.error) {
      throw new Error(userLogin.error);
    }
    setUser(userLogin);
    return true;
  };

  const logout = () => {
    setUser(null);
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
      value={{ user, setUser, login, logout, enableAccount, unableAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
