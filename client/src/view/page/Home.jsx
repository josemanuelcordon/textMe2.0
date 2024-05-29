// Home.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import ChatList from "../components/ChatList";
import { io } from "socket.io-client";
import {
  Column,
  Grid,
  ExpandableSearch,
  OverflowMenu,
  OverflowMenuItem,
} from "@carbon/react";
import { Filter } from "@carbon/icons-react";

import messageService from "../../service/messageService";
import ModalContainer from "../components/ModalContainer";
import ChatService from "../../service/ChatService";
import GroupModalContainer from "../components/GroupModalContainer";
import { useNotifications } from "../context/NotificationContext";
import { Notification } from "../../domain/Notification";

let socket;

const Home = () => {
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [sortedChats, setSortedChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();

  const navigate = useNavigate();

  useEffect(() => {
    socket = io("ws://localhost:3000");
    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket", socket);
      socket.emit("subscribeToChats", user.id);
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const messageHandler = async (message) => {
      if (message.sender !== user.id) {
        addNotification(
          new Notification(`Mensaje recibido! \n ${message.content}`, "info")
        );
      }
      if (message.chat === chat?.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        await messageService.readMessages(chat.id, user.id);
      }
      const chatIndex = chats.findIndex((chat) => chat.id === message.chat);

      if (chatIndex !== -1) {
        const updatedChats = [...chats];

        const chatToUpdate = updatedChats[chatIndex];

        chatToUpdate.lastMessage = message.content;
        if (message.sender !== user.id && chat?.id !== message.chat) {
          chatToUpdate.unreadMessages += 1;
        }

        updatedChats.splice(chatIndex, 1);
        updatedChats.unshift(chatToUpdate);

        setChats(updatedChats);
      } else {
        const chatsUpdated = await ChatService.getUserChats(user.id);
        setChats(chatsUpdated);
      }
    };
    socket.on("message", messageHandler);

    return () => {
      socket.off("message");
    };
  }, [chat, socket, chats]);

  const handleSearch = (e) => {
    const chatName = e.target.value.toLowerCase();

    setSortedChats(() => {
      if (chatName !== "") {
        // Crear una copia del array de chats y ordenar
        const sortedChats = [...chats].sort((a, b) => {
          const aMatches = a.name.toLowerCase().includes(chatName);
          const bMatches = b.name.toLowerCase().includes(chatName);
          if (aMatches && !bMatches) return -1;
          if (!aMatches && bMatches) return 1;
          return 0;
        });
        return sortedChats;
      } else {
        // Si no hay valor de búsqueda, devolver el array original
        return chats;
      }
    });
  };

  return (
    <Grid narrow fullWidth className="page--template">
      <Column lg={4}>
        <ExpandableSearch
          size="lg"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          onChange={handleSearch}
        />
      </Column>
      <Column lg={12} className="options-section">
        <OverflowMenu menuOffset={{ left: -60 }} size="lg" renderIcon={Filter}>
          <OverflowMenuItem
            onClick={() => navigate("/profile")}
            itemText="Ver Perfil"
          />
          <OverflowMenuItem
            onClick={() => setOpen(true)}
            itemText="Buscar Amigos"
          />
          <OverflowMenuItem
            onClick={() => setOpen2(true)}
            itemText="Crear Grupo"
          />
          <OverflowMenuItem
            onClick={logout}
            isDelete
            itemText="Cerrar Sesión"
          />
        </OverflowMenu>
      </Column>
      <Column lg={4}>
        <ChatList
          user={user}
          chats={chats}
          chat={chat}
          sortedChats={sortedChats}
          setChats={setChats}
          setChat={setChat}
        />
      </Column>
      <Column lg={12}>
        <main className="chat--container">
          {chat && (
            <Chat
              user={user}
              messages={messages}
              chat={chat}
              setChat={setChat}
              socket={socket}
              chats={chats}
              setChats={setChats}
              setMessages={setMessages}
            />
          )}
          <ModalContainer
            open={open}
            setOpen={setOpen}
            setChat={setChat}
            user={user}
            chats={chats}
            socket={socket}
            setChats={setChats}
          />
          <GroupModalContainer
            open={open2}
            setOpen={setOpen2}
            setChat={setChat}
            user={user}
            socket={socket}
            setChats={setChats}
          />
        </main>
      </Column>
    </Grid>
  );
};

export default Home;
