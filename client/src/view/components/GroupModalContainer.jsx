import {
  Button,
  Column,
  Grid,
  Modal,
  SelectableTile,
  TextInput,
  FileUploader,
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      setSelectedFile(file);
    }
  };

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

      if (!selectedFile) {
        setChats((prev) => [chat, ...prev]);
        setChat(chat);
        setOpen(false);

        socket.emit("createChat", chat.id);
        return;
      }

      const formData = new FormData();
      const renamedFile = new File(
        [selectedFile],
        `chat-${chat.id}${selectedFile.name.substring(
          selectedFile.name.lastIndexOf(".")
        )}`,
        {
          type: selectedFile.type,
        }
      );
      formData.append("image", renamedFile);
      try {
        const response = await fetch(
          "http://localhost:3000/upload/chat-image",
          {
            method: "POST",
            body: formData,
          }
        );
      } catch (error) {
        console.error("Error al subir la imagen", error);
        alert("Error al subir la imagen");
      }

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
          <FileUploader
            labelTitle="Subir imagen de perfil"
            buttonLabel="Subir imagen"
            buttonKind="ghost"
            size="sm"
            filenameStatus="edit"
            accept={[".jpg", ".png"]}
            multiple={false}
            iconDescription="Eliminar archivo"
            onChange={handleFileChange}
          />
        </Column>
        <Column lg={16}>
          <div role="group" aria-label="selectable tiles">
            {friends.map((user) => (
              <SelectableTile
                className="chat"
                onClick={() => addToChat(user.id)}
              >
                <h3>{user.username}</h3>
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
