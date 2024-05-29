import { Button, Column, Grid, Modal, TextInput, Tile } from "@carbon/react";
import React, { useState } from "react";
import UserService from "../../service/UserService";
import ChatService from "../../service/ChatService";
import { Notification } from "../../domain/Notification";
import { useNotifications } from "../context/NotificationContext";

const ModalContainer = ({
  open,
  setOpen,
  setChat,
  setChats,
  user,
  chats,
  socket,
}) => {
  const [newChats, setNewChats] = useState([]);
  const [search, setSearch] = useState("");
  const { addNotification } = useNotifications();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = await UserService.findUserByName(search);
    setNewChats(users);
  };

  const createChat = async (userId, username) => {
    if (!chats.some((chat) => chat.name === username)) {
      const chat = await ChatService.createChat(user.id, userId);
      setChats((prev) => [chat, ...prev]);
      setChat(chat);
      setOpen(false);

      socket.emit("createChat", chat.id);
    } else {
      addNotification(new Notification("No se pudo crear el chat", "warning"));
    }
  };

  return (
    <Modal
      open={open}
      onRequestClose={() => setOpen(false)}
      modalHeading="Empezar conversaciones"
      size="lg"
      passiveModal
    >
      <Grid>
        <Column lg={12}>
          <TextInput
            value={search}
            onChange={handleSearch}
            labelText="Buscar a gente nueva"
          />
        </Column>
        <Column lg={4}>
          <Button onClick={handleSubmit}>Buscar</Button>
        </Column>
        <Column lg={16}>
          <ul className="friend--list">
            {newChats.map((userToList) => {
              if (userToList.username !== user.username) {
                return (
                  <Tile
                    key={userToList.id} // Asegúrate de usar una clave única para cada elemento
                    className="chat"
                    onClick={() =>
                      createChat(userToList.id, userToList.username)
                    }
                  >
                    <h3>{userToList.username}</h3>
                  </Tile>
                );
              }
              return null;
            })}
          </ul>
        </Column>
      </Grid>
    </Modal>
  );
};

export default ModalContainer;
