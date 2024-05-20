import { Button, Column, Grid, Modal, TextInput, Tile } from "@carbon/react";
import React, { useState } from "react";
import UserService from "../../service/UserService";
import ChatService from "../../service/ChatService";

const ModalContainer = ({ open, setOpen, setChat, setChats, user, socket }) => {
  const [newChats, setNewChats] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = await UserService.findUserByName(search);
    setNewChats(users);
  };

  const createChat = async (userId) => {
    const chat = await ChatService.createChat(user.id, userId);
    setChats((prev) => [chat, ...prev]);
    setChat(chat);
    setOpen(false);

    socket.emit("createChat", chat.id);
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
            {newChats.map((user) => (
              <Tile className="chat" onClick={() => createChat(user.id)}>
                <h3>{user.name}</h3>
              </Tile>
            ))}
          </ul>
        </Column>
      </Grid>
    </Modal>
  );
};

export default ModalContainer;
