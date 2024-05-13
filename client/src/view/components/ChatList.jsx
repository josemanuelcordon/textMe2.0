import React, { useEffect } from "react";
import ChatService from "../../service/ChatService.js";
import { useAuth } from "../context/AuthContext";
import { Tile } from "@carbon/react";

const ChatList = ({ chats, setChats, setChat, socket }) => {
  const { user } = useAuth();

  useEffect(() => {
    const getChats = async () => {
      const chatsResponse = await ChatService.getUserChats(user.id);
      console.log(chatsResponse);
      setChats(chatsResponse);
    };
    getChats();

    socket.on("message", () => {
      getChats();
    });
  }, [user]);

  return (
    <section className="chat--list">
      {chats.map((chat) => (
        <Tile onClick={() => setChat(chat)}>
          <h3>{chat.name.name}</h3>
        </Tile>
      ))}
    </section>
  );
};

export default ChatList;
