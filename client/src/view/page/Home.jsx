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
  Button,
} from "@carbon/react";
import { Filter, Menu } from "@carbon/icons-react";

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
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 1055);

  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 1055);
    };

    window.addEventListener("resize", handleResize);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    socket = io("wss://localhost");
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
      setSortedChats([]);
      if (message.sender !== user.id) {
        addNotification(
          new Notification(`Mensaje recibido: \n ${message.content}`, "info")
        );
      }
      if (message.chat === chat?.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        await messageService.readMessages(chat.id, user.id);
      }
      const chatIndex = chats.findIndex((chat) => chat.id === message.chat);
      let chatsUpdated = [...chats];

      if (chatIndex === -1) {
        chatsUpdated = await ChatService.getUserChats(user.id);
      }

      const newChatIndex = chatsUpdated.findIndex(
        (chat) => chat.id === message.chat
      );

      const chatToUpdate = chatsUpdated[newChatIndex];

      if (chatIndex !== -1) {
        if (message.sender !== user.id && chat?.id !== message.chat) {
          chatToUpdate.unreadMessages += 1;
        }
      }

      chatToUpdate.lastMessage = message.content;

      chatsUpdated.splice(chatIndex, 1);
      chatsUpdated.unshift(chatToUpdate);

      setChats(chatsUpdated);
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
      <Column xlg={4} lg={6} md={0} sm={0} className="search-column">
        <ExpandableSearch
          size="lg"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          onChange={handleSearch}
        />
      </Column>
      <Column
        xlg={12}
        lg={10}
        md={8}
        sm={4}
        className={`options-section ${
          isScreenSmall ? "options-with-menu" : ""
        }`}
      >
        {isScreenSmall && (
          <Button
            hasIconOnly
            renderIcon={Menu}
            kind="ghost"
            iconDescription="Abrir chats"
            nonce=""
            align="right"
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            className="menu-button"
          />
        )}
        <OverflowMenu
          menuOffset={{ left: -60 }}
          size="lg"
          align="left"
          iconDescription="Opciones"
        >
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
            hasDivider
            isDelete
            itemText="Cerrar Sesión"
          />
        </OverflowMenu>
      </Column>
      <Column xlg={4} lg={6} md={0} sm={0} className="chat-list-column">
        <ChatList
          user={user}
          chats={chats}
          chat={chat}
          sortedChats={sortedChats}
          setSortedChats={setSortedChats}
          setChats={setChats}
          setChat={setChat}
        />
      </Column>
      <Column xlg={12} lg={10} md={8} sm={4} className="chat--grid--column">
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

      {isSideNavOpen && (
        <div className="side-nav">
          <ExpandableSearch
            size="lg"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-expandable-2"
            onChange={handleSearch}
          />
          <ChatList
            user={user}
            chats={chats}
            chat={chat}
            isExpandable={true}
            setIsSideNavOpen={setIsSideNavOpen}
            setSortedChats={setSortedChats}
            sortedChats={sortedChats}
            setChats={setChats}
            setChat={setChat}
          />
        </div>
      )}
    </Grid>
  );
};

export default Home;
