import {
  Button,
  Column,
  Grid,
  Modal,
  TextInput,
  Tile,
  PaginationNav,
} from "@carbon/react";
import React, { useState } from "react";
import UserService from "../../service/UserService";
import ChatService from "../../service/ChatService";
import { Notification } from "../../domain/Notification";
import { useNotifications } from "../context/NotificationContext";

const apiUrl = import.meta.env.VITE_API_URL;
const USERS_SHOWN = 6;

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
  const [currentPage, setCurrentPage] = useState(1);
  const { addNotification } = useNotifications();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = await UserService.findUserByName(search);
    setNewChats(users);
    setCurrentPage(0);
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

  const startIndex = currentPage * USERS_SHOWN;
  const endIndex = startIndex + USERS_SHOWN;
  const currentChats = newChats.slice(startIndex, endIndex);
  const totalPages = Math.ceil(newChats.length / USERS_SHOWN);

  return (
    <Modal
      open={open}
      onRequestClose={() => setOpen(false)}
      modalHeading="Empezar conversaciones"
      size="lg"
      passiveModal
    >
      <Grid>
        <Column lg={12} md={6} sm={4}>
          <TextInput
            maxCount={255}
            invalidText="El texto es demasiado largo..."
            value={search}
            onChange={handleSearch}
            labelText="Buscar a gente nueva"
          />
        </Column>
        <Column lg={4} md={2} sm={4}>
          <div className="search-button-container">
            <Button onClick={handleSubmit}>Buscar</Button>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <ul className="friend--list">
            {currentChats.map((userToList) => {
              if (
                userToList.username !== user.username &&
                userToList.active === 1 &&
                userToList.is_banned === 0
              ) {
                return (
                  <Tile
                    key={userToList.id} // Asegúrate de usar una clave única para cada elemento
                    className="chat"
                    onClick={() =>
                      createChat(userToList.id, userToList.username)
                    }
                  >
                    <img
                      src={`${window.location.protocol}//${window.location.hostname}/profile-image/${userToList.id}`}
                    />
                    <h3>{userToList.username}</h3>
                  </Tile>
                );
              }
              return null;
            })}
          </ul>
        </Column>
        <Column lg={16} md={8} sm={4}>
          <PaginationNav
            className={`${newChats.length > 0 ? "show" : "hidden"}`}
            itemsShown={10}
            totalItems={totalPages}
            onChange={(page) => setCurrentPage(page)}
            page={currentPage}
          />
        </Column>
      </Grid>
    </Modal>
  );
};

export default ModalContainer;
