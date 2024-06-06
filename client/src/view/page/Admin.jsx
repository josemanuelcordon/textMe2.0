import React, { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import { Button, Layer, Tile } from "@carbon/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBan = (id) => {
    UserService.banUser(id);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, is_banned: 1 } : user
      )
    );
  };

  const handleDisban = (id) => {
    UserService.disbanUser(id);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, is_banned: 0 } : user
      )
    );
  };

  if (user.role !== "ADMIN") {
    logout();
  }

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await UserService.getAllUsers();
      setUsers(users);
    };

    getAllUsers();
  }, []);

  return (
    <main className="page--template">
      <section className="user--list">
        {users.map((user) => {
          return (
            <Layer key={user.id} level={2}>
              <Tile>
                <p>USUARIO: {user.username}</p>
                <p>EMAIL: {user.email}</p>
                <p>ROL: {user.role}</p>
                {user.is_banned ? (
                  <Button kind="danger" onClick={() => handleDisban(user.id)}>
                    Desbanear
                  </Button>
                ) : (
                  <Button kind="primary" onClick={() => handleBan(user.id)}>
                    Banear
                  </Button>
                )}
                <Button
                  kind="ghost"
                  onClick={() => navigate(`/admin/chats/${user.id}`)}
                >
                  Ver conversaciones
                </Button>
              </Tile>
            </Layer>
          );
        })}
      </section>
    </main>
  );
};

export default Admin;
