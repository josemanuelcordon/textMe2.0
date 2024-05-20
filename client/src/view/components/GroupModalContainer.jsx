import {
  Button,
  Column,
  Grid,
  Modal,
  SelectableTile,
  TextInput,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import ChatService from "../../service/ChatService";

const GroupModalContainer = ({
  open,
  setOpen,
  setChat,
  user,
  socket,
  setChats,
}) => {
  const [friends, setFriends] = useState([]);
  const [friendsSelected, setFriendsSelected] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const getFriends = async () => {
      const friends = await UserService.getUserFriends(user.id);
      console.log(friends);
      setFriends(friends);
    };
    getFriends();
  }, [open]);

  const addToChat = (userId) => {
    setFriendsSelected((prev) => {
      if (prev.some((friend) => friend === userId)) {
        return prev.filter((friend) => friend !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const createGroup = async () => {
    if (groupName) {
      const chat = await ChatService.createGroupChat(
        user.id,
        friendsSelected,
        groupName
      );

      setChats((prev) => [chat, ...prev]);
      setChat(chat);
      setOpen(false);

      socket.emit("createChat", chat.id);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setFriendsSelected([]);
  };

  return (
    <Modal
      open={open}
      onRequestClose={closeModal}
      modalHeading="Empezar conversaciones"
      size="lg"
      passiveModal
    >
      <Grid>
        <Column lg={16}>
          <TextInput
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            labelText="Nombre del grupo"
          />
        </Column>
        <Column lg={16}>
          <div role="group" aria-label="selectable tiles">
            {friends.map((user) => (
              <SelectableTile
                className="chat"
                onClick={() => addToChat(user.id)}
              >
                <h3>{user.name}</h3>
                <p>{user.phone}</p>
              </SelectableTile>
            ))}
          </div>
        </Column>
        <Column lg={13}></Column>
        <Column lg={3}>
          <Button onClick={createGroup}>Crear grupo</Button>
        </Column>
      </Grid>
    </Modal>
  );
};

export default GroupModalContainer;
