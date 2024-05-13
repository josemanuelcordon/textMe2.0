// Home.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { io } from "socket.io-client";
import { Column, Grid, ExpandableSearch } from "@carbon/react";

const Home = () => {
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    const newSocket = io("ws://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
      newSocket.emit("subscribeToChats", user.id);
    });

    newSocket.on("message", (message) => {
      // Buscar el chat en el array chats con el mismo ID que message.chat
      const chatIndex = chats.findIndex((chat) => chat.id === message.chat);
      // Si se encuentra el chat en el array
      if (chatIndex !== -1) {
        // Obtener el chat y eliminarlo del array
        const chat = chats.splice(chatIndex, 1)[0];
        // Insertar el chat al principio del array
        const chatCopy = chats;
        chatCopy.unshift(chat);
        console.log(chatCopy);
        setChats([...chatCopy]);
        console.log(`Chat with ID ${chat.id} moved to the top of the list`);
      } else {
        console.log(`Chat with ID ${message.chat} not found`);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <Grid className="page--template">
      <Column lg={16}>
        <ExpandableSearch
          size="lg"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      </Column>
      <Column lg={4}>
        {socket && (
          <ChatList
            chats={chats}
            setChats={setChats}
            setChat={setChat}
            socket={socket}
          />
        )}
      </Column>
      <Column lg={12}>
        <main className="chat--container">
          {chat && (
            <Chat
              user={user}
              chat={chat}
              socket={socket}
              chats={chats}
              setChats={setChats}
            />
          )}
        </main>
      </Column>
    </Grid>
  );
};

export default Home;
