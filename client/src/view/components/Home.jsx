// Home.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { io } from "socket.io-client";
import { Column, Grid, ExpandableSearch } from "@carbon/react";
import messageService from "../../service/messageService";

let socket;

const Home = () => {
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, logout } = useAuth();

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
    const messageHandler = (message) => {
      if (message.chat === chat?.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        messageService.readMessages(chat.id, user.id);
      }
      console.log(chats);
      const chatIndex = chats.findIndex((chat) => chat.id === message.chat);

      if (chatIndex !== -1) {
        const updatedChats = [...chats];

        const chatToUpdate = updatedChats[chatIndex];

        chatToUpdate.lastMessage = message.content;
        if (message.sender !== user.id && chat.id !== message.chat) {
          chatToUpdate.unreadMessages += 1;
        }

        updatedChats.splice(chatIndex, 1);
        updatedChats.unshift(chatToUpdate);

        setChats(updatedChats);

        console.log(
          `Chat with ID ${chatToUpdate.id} updated and moved to the top of the list`
        );
      } else {
        console.log(`Chat with ID ${message.chat} not found`);
      }
    };
    socket.on("message", messageHandler);

    return () => {
      socket.off("message");
    };
  }, [chat, socket, chats]);

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
        <ChatList
          user={user}
          chats={chats}
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
        </main>
      </Column>
    </Grid>
  );
};

export default Home;
