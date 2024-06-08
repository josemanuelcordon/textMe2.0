import {
  Button,
  Column,
  Grid,
  Modal,
  SelectableTile,
  TextInput,
  FileUploader,
  PaginationNav,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import ChatService from "../../service/ChatService";
import { Notification } from "../../domain/Notification";
import { useNotifications } from "../context/NotificationContext";

const USERS_SHOWN = 3;
const apiUrl = import.meta.env.VITE_API_URL;

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
  const [currentPage, setCurrentPage] = useState(0);

  const { addNotification } = useNotifications();

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      const friends = await UserService.getUserFriends(user.id);
      setFriends(friends);
    };
    if (open) {
      getFriends();
    }
  }, [open, user.id]);

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
        await fetch(
          `${window.location.protocol}//${window.location.hostname}/upload/chat-image`,
          {
            method: "POST",
            body: formData,
          }
        );
      } catch (error) {
        addNotification(new Notification("Error al subir la imagen", "error"));
      }

      setChats((prev) => [chat, ...prev]);
      setChat(chat);
      setOpen(false);
      socket.emit("createChat", chat.id);
    } else {
      addNotification(
        new Notification("Selecciona un nombre para el grupo", "warning")
      );
    }
  };

  const closeModal = () => {
    setOpen(false);
    setFriendsSelected([]);
  };

  const startIndex = currentPage * USERS_SHOWN;
  const endIndex = startIndex + USERS_SHOWN;
  const currentFriends = friends.slice(startIndex, endIndex);
  const totalPages = Math.ceil(friends.length / USERS_SHOWN);

  return (
    <Modal
      open={open}
      onRequestClose={closeModal}
      modalHeading="Empezar conversaciones"
      size="lg"
      passiveModal
    >
      <Grid>
        <Column lg={10} md={8} sm={4}>
          <TextInput
            value={groupName}
            maxCount={255}
            invalidText="El texto es demasiado largo..."
            onChange={(e) => setGroupName(e.target.value)}
            labelText="Nombre del grupo"
          />
        </Column>
        <Column className="button-container" lg={6} md={8} sm={4}>
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
        <Column lg={16} md={8} sm={4}>
          <div
            className="friends-select-container"
            role="group"
            aria-label="selectable tiles"
          >
            {currentFriends.map((user) => (
              <SelectableTile
                className="chat-selectable"
                selected={friendsSelected.includes(user.id)}
                onClick={() => addToChat(user.id)}
              >
                <img
                  src={`${window.location.protocol}//${window.location.hostname}/profile-image/${user.id}`}
                />
                <h3>{user.username}</h3>
              </SelectableTile>
            ))}
          </div>
        </Column>
        <Column lg={16} md={8} sm={4}>
          <PaginationNav
            className={`${friends.length > 0 ? "show" : "hidden"}`}
            itemsShown={10}
            totalItems={totalPages}
            onChange={(page) => setCurrentPage(page)}
            page={currentPage}
          />
        </Column>
        <Column lg={13} md={0} sm={0}></Column>
        <Column className="button-container" lg={3} md={8} sm={4}>
          <Button onClick={createGroup}>Crear grupo</Button>
        </Column>
      </Grid>
    </Modal>
  );
};

export default GroupModalContainer;
